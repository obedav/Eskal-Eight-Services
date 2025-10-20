<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Models\Quote;
use App\Models\Service;
use App\Helpers\Response;
use App\Exceptions\ValidationException;

/**
 * Quote Controller
 */
class QuoteController extends BaseController {
    private Quote $quoteModel;
    private Service $serviceModel;

    public function __construct() {
        parent::__construct();
        $this->quoteModel = new Quote();
        $this->serviceModel = new Service();
    }

    /**
     * Create new quote request
     * POST /api/quotes
     */
    public function create(): void {
        $this->requireMethod('POST');
        $this->requireAuth();

        try {
            $userId = (int)$this->user->user_id;

            // Validate input
            $serviceId = $this->getInt('service_id');
            $projectTitle = $this->getString('project_title');
            $description = $this->getString('description');
            $contactEmail = $this->getEmail('contact_email');
            $contactPhone = $this->getString('contact_phone');

            if (empty($projectTitle) || empty($description) || empty($contactEmail) || empty($contactPhone)) {
                throw new ValidationException('All required fields must be filled');
            }

            if (strlen($description) < 50) {
                throw new ValidationException('Description must be at least 50 characters');
            }

            // Verify service exists if provided
            if ($serviceId > 0) {
                $service = $this->serviceModel->find($serviceId);
                if (!$service) {
                    throw new ValidationException('Invalid service selected');
                }
            }

            // Create quote
            $quoteData = [
                'user_id' => $userId,
                'service_id' => $serviceId > 0 ? $serviceId : null,
                'project_title' => $projectTitle,
                'description' => $description,
                'budget' => $this->getString('budget'),
                'timeline' => $this->getString('timeline'),
                'location' => $this->getString('location'),
                'contact_email' => $contactEmail,
                'contact_phone' => $contactPhone,
                'additional_notes' => $this->getString('additional_notes'),
            ];

            $quoteId = $this->quoteModel->createQuote($quoteData);

            // Get created quote
            $quote = $this->quoteModel->find($quoteId);

            Response::success($quote, 'Quote request submitted successfully', 201);

        } catch (ValidationException $e) {
            Response::error($e->getMessage(), null, 400);
        } catch (\Exception $e) {
            error_log("Create Quote Error: " . $e->getMessage());
            Response::error('An error occurred while creating quote', null, 500);
        }
    }

    /**
     * Get all quotes (admin)
     * GET /api/quotes
     */
    public function getAll(): void {
        $this->requireMethod('GET');
        $this->requireAdmin();

        try {
            $pagination = $this->getPaginationParams();
            $status = $this->getString('status');

            if ($status) {
                $quotes = $this->quoteModel->getByStatus($status, $pagination['per_page'], ($pagination['page'] - 1) * $pagination['per_page']);
            } else {
                $quotes = $this->quoteModel->findAll($pagination['per_page'], ($pagination['page'] - 1) * $pagination['per_page']);
            }

            $total = $this->quoteModel->count();

            Response::success([
                'quotes' => $quotes,
                'total' => $total,
                'page' => $pagination['page'],
                'per_page' => $pagination['per_page']
            ]);

        } catch (\Exception $e) {
            error_log("Get Quotes Error: " . $e->getMessage());
            Response::error('An error occurred', null, 500);
        }
    }

    /**
     * Get user's quotes
     * GET /api/quotes/my
     */
    public function getMyQuotes(): void {
        $this->requireMethod('GET');
        $this->requireAuth();

        try {
            $userId = (int)$this->user->user_id;
            $pagination = $this->getPaginationParams();

            $quotes = $this->quoteModel->getByUserId(
                $userId,
                $pagination['per_page'],
                ($pagination['page'] - 1) * $pagination['per_page']
            );

            $total = $this->quoteModel->count(['user_id' => $userId]);

            Response::success([
                'quotes' => $quotes,
                'total' => $total,
                'page' => $pagination['page'],
                'per_page' => $pagination['per_page']
            ]);

        } catch (\Exception $e) {
            error_log("Get My Quotes Error: " . $e->getMessage());
            Response::error('An error occurred', null, 500);
        }
    }

    /**
     * Get single quote
     * GET /api/quotes/:id
     */
    public function getOne(): void {
        $this->requireMethod('GET');
        $this->requireAuth();

        try {
            $quoteId = $this->getInt('id');

            if (!$quoteId) {
                Response::error('Quote ID is required', null, 400);
            }

            $quote = $this->quoteModel->find($quoteId);

            if (!$quote) {
                Response::notFound('Quote not found');
            }

            // Check permission
            if ($this->user->role === ROLE_CLIENT && $quote['user_id'] != $this->user->user_id) {
                Response::forbidden('You do not have permission to view this quote');
            }

            // Get activities and documents
            $quote['activities'] = $this->quoteModel->getActivities($quoteId);
            $quote['documents'] = $this->quoteModel->getDocuments($quoteId);

            Response::success(['quote' => $quote]);

        } catch (\Exception $e) {
            error_log("Get Quote Error: " . $e->getMessage());
            Response::error('An error occurred', null, 500);
        }
    }

    /**
     * Update quote status (admin)
     * PUT /api/quotes/:id/status
     */
    public function updateStatus(): void {
        $this->requireMethod('PUT');
        $this->requireAdmin();

        try {
            $quoteId = $this->getInt('id');
            $newStatus = $this->getString('status');
            $notes = $this->getString('notes');

            if (!$quoteId || !$newStatus) {
                throw new ValidationException('Quote ID and status are required');
            }

            $validStatuses = ['pending', 'in_review', 'approved', 'rejected', 'completed'];
            if (!in_array($newStatus, $validStatuses)) {
                throw new ValidationException('Invalid status');
            }

            $userId = (int)$this->user->user_id;
            $success = $this->quoteModel->updateStatus($quoteId, $newStatus, $userId, $notes);

            if (!$success) {
                Response::error('Failed to update quote status', null, 500);
            }

            Response::success(null, 'Quote status updated successfully');

        } catch (ValidationException $e) {
            Response::error($e->getMessage(), null, 400);
        } catch (\Exception $e) {
            error_log("Update Quote Status Error: " . $e->getMessage());
            Response::error('An error occurred', null, 500);
        }
    }

    /**
     * Set quote amount (admin)
     * PUT /api/quotes/:id/amount
     */
    public function setAmount(): void {
        $this->requireMethod('PUT');
        $this->requireAdmin();

        try {
            $quoteId = $this->getInt('id');
            $amount = $this->getFloat('amount');

            if (!$quoteId || $amount <= 0) {
                throw new ValidationException('Valid quote ID and amount are required');
            }

            $userId = (int)$this->user->user_id;
            $success = $this->quoteModel->setAmount($quoteId, $amount, $userId);

            if (!$success) {
                Response::error('Failed to set quote amount', null, 500);
            }

            Response::success(null, 'Quote amount set successfully');

        } catch (ValidationException $e) {
            Response::error($e->getMessage(), null, 400);
        } catch (\Exception $e) {
            error_log("Set Quote Amount Error: " . $e->getMessage());
            Response::error('An error occurred', null, 500);
        }
    }

    /**
     * Get quote statistics (admin)
     * GET /api/quotes/statistics
     */
    public function getStatistics(): void {
        $this->requireMethod('GET');
        $this->requireAdmin();

        try {
            $stats = $this->quoteModel->getStatistics();
            Response::success(['statistics' => $stats]);

        } catch (\Exception $e) {
            error_log("Get Quote Statistics Error: " . $e->getMessage());
            Response::error('An error occurred', null, 500);
        }
    }

    /**
     * Search quotes
     * GET /api/quotes/search
     */
    public function search(): void {
        $this->requireMethod('GET');
        $this->requireAuth();

        try {
            $query = $this->getString('q');

            if (empty($query)) {
                Response::error('Search query is required', null, 400);
            }

            $pagination = $this->getPaginationParams();
            $quotes = $this->quoteModel->search(
                $query,
                $pagination['per_page'],
                ($pagination['page'] - 1) * $pagination['per_page']
            );

            Response::success([
                'quotes' => $quotes,
                'query' => $query
            ]);

        } catch (\Exception $e) {
            error_log("Search Quotes Error: " . $e->getMessage());
            Response::error('An error occurred', null, 500);
        }
    }
}
