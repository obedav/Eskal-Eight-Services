<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Models\Quote;
use App\Models\Payment;
use App\Models\Project;
use App\Models\User;
use App\Helpers\Response;

/**
 * Analytics Controller - Provides dashboard statistics and analytics
 */
class AnalyticsController extends BaseController {
    private Quote $quoteModel;
    private Payment $paymentModel;
    private Project $projectModel;
    private User $userModel;

    public function __construct() {
        parent::__construct();
        $this->quoteModel = new Quote();
        $this->paymentModel = new Payment();
        $this->projectModel = new Project();
        $this->userModel = new User();
    }

    /**
     * Get dashboard overview statistics
     * GET /api/analytics/dashboard
     */
    public function getDashboard(): void {
        try {
            // Get quote statistics
            $quoteStats = $this->quoteModel->getStatistics();

            // Get payment statistics
            $paymentStats = $this->paymentModel->getStatistics();

            // Get project statistics
            $projectStats = $this->projectModel->getStatistics();

            // Get user statistics
            $userStats = $this->userModel->getStatistics();

            $dashboard = [
                'quotes' => [
                    'total' => $quoteStats['total'] ?? 0,
                    'pending' => $quoteStats['pending'] ?? 0,
                    'approved' => $quoteStats['approved'] ?? 0,
                    'rejected' => $quoteStats['rejected'] ?? 0,
                ],
                'payments' => [
                    'total_amount' => $paymentStats['total_revenue'] ?? 0,
                    'total_count' => $paymentStats['total_payments'] ?? 0,
                    'pending_amount' => $paymentStats['pending_payments'] ?? 0,
                    'completed_amount' => $paymentStats['total_revenue'] ?? 0,
                ],
                'projects' => [
                    'total' => $projectStats['total'] ?? 0,
                    'planning' => $projectStats['planning'] ?? 0,
                    'in_progress' => $projectStats['in_progress'] ?? 0,
                    'completed' => $projectStats['completed'] ?? 0,
                ],
                'users' => [
                    'total' => $userStats['total'] ?? 0,
                    'active' => $userStats['active'] ?? 0,
                    'inactive' => $userStats['inactive'] ?? 0,
                    'clients' => $userStats['clients'] ?? 0,
                ],
            ];

            Response::success($dashboard, 'Dashboard statistics retrieved successfully');

        } catch (\Exception $e) {
            error_log("Get Dashboard Analytics Error: " . $e->getMessage());
            Response::error('Failed to retrieve dashboard analytics', null, 500);
        }
    }

    /**
     * Get revenue analytics
     * GET /api/analytics/revenue
     */
    public function getRevenue(): void {
        try {
            $period = $_GET['period'] ?? '30days'; // 7days, 30days, 90days, year

            $revenueData = $this->paymentModel->getRevenueByPeriod($period);

            Response::success($revenueData, 'Revenue analytics retrieved successfully');

        } catch (\Exception $e) {
            error_log("Get Revenue Analytics Error: " . $e->getMessage());
            Response::error('Failed to retrieve revenue analytics', null, 500);
        }
    }

    /**
     * Get quote trends
     * GET /api/analytics/quote-trends
     */
    public function getQuoteTrends(): void {
        try {
            $period = $_GET['period'] ?? '30days';

            $quoteTrends = $this->quoteModel->getTrendsByPeriod($period);

            Response::success($quoteTrends, 'Quote trends retrieved successfully');

        } catch (\Exception $e) {
            error_log("Get Quote Trends Error: " . $e->getMessage());
            Response::error('Failed to retrieve quote trends', null, 500);
        }
    }

    /**
     * Get client activity statistics
     * GET /api/analytics/client-activity
     */
    public function getClientActivity(): void {
        try {
            $limit = (int)($_GET['limit'] ?? 10);

            $activity = [
                'recent_clients' => $this->userModel->getRecentClients($limit),
                'top_clients' => $this->quoteModel->getTopClients($limit),
            ];

            Response::success($activity, 'Client activity retrieved successfully');

        } catch (\Exception $e) {
            error_log("Get Client Activity Error: " . $e->getMessage());
            Response::error('Failed to retrieve client activity', null, 500);
        }
    }

    /**
     * Get service performance statistics
     * GET /api/analytics/service-performance
     */
    public function getServicePerformance(): void {
        try {
            $period = $_GET['period'] ?? '30days';

            $performance = $this->quoteModel->getServicePerformance($period);

            Response::success($performance, 'Service performance retrieved successfully');

        } catch (\Exception $e) {
            error_log("Get Service Performance Error: " . $e->getMessage());
            Response::error('Failed to retrieve service performance', null, 500);
        }
    }

    /**
     * Get recent activity feed
     * GET /api/analytics/recent-activity
     */
    public function getRecentActivity(): void {
        try {
            $limit = (int)($_GET['limit'] ?? 20);

            // Get recent quotes
            $recentQuotes = $this->quoteModel->getRecent(5);

            // Get recent payments
            $recentPayments = $this->paymentModel->getRecent(5);

            // Get recent projects
            $recentProjects = $this->projectModel->getRecent(5);

            $activity = [
                'quotes' => $recentQuotes,
                'payments' => $recentPayments,
                'projects' => $recentProjects,
            ];

            Response::success($activity, 'Recent activity retrieved successfully');

        } catch (\Exception $e) {
            error_log("Get Recent Activity Error: " . $e->getMessage());
            Response::error('Failed to retrieve recent activity', null, 500);
        }
    }

    /**
     * Export analytics data
     * GET /api/analytics/export
     */
    public function exportData(): void {
        try {
            $type = $_GET['type'] ?? 'dashboard'; // dashboard, revenue, quotes, payments
            $format = $_GET['format'] ?? 'csv'; // csv, json

            $data = [];

            switch ($type) {
                case 'revenue':
                    $period = $_GET['period'] ?? '30days';
                    $data = $this->paymentModel->getRevenueByPeriod($period);
                    break;

                case 'quotes':
                    $data = $this->quoteModel->getAll('', 0, 0, 1000, 0);
                    break;

                case 'payments':
                    $data = $this->paymentModel->getAll('', '', 1000, 0);
                    break;

                default:
                    $quoteStats = $this->quoteModel->getStatistics();
                    $paymentStats = $this->paymentModel->getStatistics();
                    $projectStats = $this->projectModel->getStatistics();
                    $userStats = $this->userModel->getStatistics();

                    $data = [
                        'quotes' => $quoteStats,
                        'payments' => $paymentStats,
                        'projects' => $projectStats,
                        'users' => $userStats,
                    ];
            }

            if ($format === 'csv') {
                // Convert to CSV format
                header('Content-Type: text/csv');
                header('Content-Disposition: attachment; filename="analytics_' . $type . '_' . date('Y-m-d') . '.csv"');

                $output = fopen('php://output', 'w');

                if (!empty($data) && is_array($data)) {
                    // Write headers
                    fputcsv($output, array_keys(is_array($data[0]) ? $data[0] : $data));

                    // Write data
                    if (isset($data[0])) {
                        foreach ($data as $row) {
                            fputcsv($output, is_array($row) ? $row : [$row]);
                        }
                    } else {
                        fputcsv($output, $data);
                    }
                }

                fclose($output);
                exit;
            } else {
                // JSON format
                Response::success($data, 'Analytics data exported successfully');
            }

        } catch (\Exception $e) {
            error_log("Export Analytics Error: " . $e->getMessage());
            Response::error('Failed to export analytics data', null, 500);
        }
    }
}
