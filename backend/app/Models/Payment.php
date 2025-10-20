<?php
declare(strict_types=1);

namespace App\Models;

use PDO;
use Exception;

/**
 * Payment Model
 *
 * Handles all payment-related database operations
 */
class Payment extends BaseModel
{
    protected string $table = 'payments';

    /**
     * Create a new payment record
     *
     * @param array $data Payment data
     * @return array|null Created payment record
     */
    public function create(array $data): ?array
    {
        try {
            $sql = "INSERT INTO {$this->table}
                    (quote_id, user_id, amount, currency, payment_method, payment_type,
                     status, reference, transaction_id, payment_gateway_response, metadata)
                    VALUES (:quote_id, :user_id, :amount, :currency, :payment_method, :payment_type,
                            :status, :reference, :transaction_id, :payment_gateway_response, :metadata)";

            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                'quote_id' => $data['quote_id'],
                'user_id' => $data['user_id'],
                'amount' => $data['amount'],
                'currency' => $data['currency'] ?? 'NGN',
                'payment_method' => $data['payment_method'],
                'payment_type' => $data['payment_type'] ?? 'full',
                'status' => $data['status'] ?? 'pending',
                'reference' => $data['reference'],
                'transaction_id' => $data['transaction_id'] ?? null,
                'payment_gateway_response' => isset($data['payment_gateway_response'])
                    ? json_encode($data['payment_gateway_response'])
                    : null,
                'metadata' => isset($data['metadata']) ? json_encode($data['metadata']) : null,
            ]);

            $paymentId = (int) $this->db->lastInsertId();
            return $this->findById($paymentId);
        } catch (Exception $e) {
            error_log('Payment creation error: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Find payment by ID
     *
     * @param int $id Payment ID
     * @return array|null Payment record
     */
    public function findById(int $id): ?array
    {
        $stmt = $this->db->prepare(
            "SELECT p.*,
                    u.first_name, u.last_name, u.email,
                    q.quote_number, q.service_id, q.total_amount as quote_amount
             FROM {$this->table} p
             LEFT JOIN users u ON p.user_id = u.id
             LEFT JOIN quotes q ON p.quote_id = q.id
             WHERE p.id = ?"
        );
        $stmt->execute([$id]);
        $payment = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($payment) {
            $payment = $this->formatPayment($payment);
        }

        return $payment ?: null;
    }

    /**
     * Find payment by reference
     *
     * @param string $reference Payment reference
     * @return array|null Payment record
     */
    public function findByReference(string $reference): ?array
    {
        $stmt = $this->db->prepare(
            "SELECT p.*,
                    u.first_name, u.last_name, u.email,
                    q.quote_number, q.service_id, q.total_amount as quote_amount
             FROM {$this->table} p
             LEFT JOIN users u ON p.user_id = u.id
             LEFT JOIN quotes q ON p.quote_id = q.id
             WHERE p.reference = ?"
        );
        $stmt->execute([$reference]);
        $payment = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($payment) {
            $payment = $this->formatPayment($payment);
        }

        return $payment ?: null;
    }

    /**
     * Find payments by quote ID
     *
     * @param int $quoteId Quote ID
     * @return array List of payments
     */
    public function findByQuoteId(int $quoteId): array
    {
        $stmt = $this->db->prepare(
            "SELECT p.*,
                    u.first_name, u.last_name, u.email
             FROM {$this->table} p
             LEFT JOIN users u ON p.user_id = u.id
             WHERE p.quote_id = ?
             ORDER BY p.created_at DESC"
        );
        $stmt->execute([$quoteId]);
        $payments = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return array_map([$this, 'formatPayment'], $payments);
    }

    /**
     * Find payments by user ID
     *
     * @param int $userId User ID
     * @param array $filters Optional filters (status, payment_method)
     * @return array List of payments
     */
    public function findByUserId(int $userId, array $filters = []): array
    {
        $sql = "SELECT p.*, q.quote_number, q.service_id
                FROM {$this->table} p
                LEFT JOIN quotes q ON p.quote_id = q.id
                WHERE p.user_id = ?";

        $params = [$userId];

        if (!empty($filters['status'])) {
            $sql .= " AND p.status = ?";
            $params[] = $filters['status'];
        }

        if (!empty($filters['payment_method'])) {
            $sql .= " AND p.payment_method = ?";
            $params[] = $filters['payment_method'];
        }

        $sql .= " ORDER BY p.created_at DESC";

        if (!empty($filters['limit'])) {
            $sql .= " LIMIT ?";
            $params[] = (int) $filters['limit'];
        }

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        $payments = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return array_map([$this, 'formatPayment'], $payments);
    }

    /**
     * Update payment status
     *
     * @param int $id Payment ID
     * @param string $status New status
     * @param array $additionalData Additional data to update
     * @return bool Success status
     */
    public function updateStatus(int $id, string $status, array $additionalData = []): bool
    {
        try {
            $fields = ['status = :status'];
            $params = ['id' => $id, 'status' => $status];

            if (isset($additionalData['transaction_id'])) {
                $fields[] = 'transaction_id = :transaction_id';
                $params['transaction_id'] = $additionalData['transaction_id'];
            }

            if (isset($additionalData['payment_gateway_response'])) {
                $fields[] = 'payment_gateway_response = :payment_gateway_response';
                $params['payment_gateway_response'] = json_encode($additionalData['payment_gateway_response']);
            }

            if ($status === 'completed') {
                $fields[] = 'paid_at = NOW()';
            }

            $sql = "UPDATE {$this->table} SET " . implode(', ', $fields) . " WHERE id = :id";
            $stmt = $this->db->prepare($sql);
            return $stmt->execute($params);
        } catch (Exception $e) {
            error_log('Payment update error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Get all payments with pagination
     *
     * @param int $page Page number
     * @param int $perPage Items per page
     * @param array $filters Optional filters
     * @return array Payments and pagination info
     */
    public function getAll(int $page = 1, int $perPage = 10, array $filters = []): array
    {
        $offset = ($page - 1) * $perPage;

        $sql = "SELECT p.*,
                       u.first_name, u.last_name, u.email,
                       q.quote_number, q.service_id
                FROM {$this->table} p
                LEFT JOIN users u ON p.user_id = u.id
                LEFT JOIN quotes q ON p.quote_id = q.id
                WHERE 1=1";

        $params = [];

        if (!empty($filters['status'])) {
            $sql .= " AND p.status = ?";
            $params[] = $filters['status'];
        }

        if (!empty($filters['payment_method'])) {
            $sql .= " AND p.payment_method = ?";
            $params[] = $filters['payment_method'];
        }

        if (!empty($filters['user_id'])) {
            $sql .= " AND p.user_id = ?";
            $params[] = $filters['user_id'];
        }

        if (!empty($filters['from_date'])) {
            $sql .= " AND p.created_at >= ?";
            $params[] = $filters['from_date'];
        }

        if (!empty($filters['to_date'])) {
            $sql .= " AND p.created_at <= ?";
            $params[] = $filters['to_date'];
        }

        // Get total count
        $countStmt = $this->db->prepare(str_replace('SELECT p.*,', 'SELECT COUNT(*) as total,', $sql));
        $countStmt->execute($params);
        $total = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];

        // Get paginated results
        $sql .= " ORDER BY p.created_at DESC LIMIT ? OFFSET ?";
        $params[] = $perPage;
        $params[] = $offset;

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        $payments = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return [
            'data' => array_map([$this, 'formatPayment'], $payments),
            'pagination' => [
                'total' => (int) $total,
                'per_page' => $perPage,
                'current_page' => $page,
                'total_pages' => ceil($total / $perPage),
            ],
        ];
    }

    /**
     * Get payment statistics
     *
     * @param array $filters Optional filters
     * @return array Statistics
     */
    public function getStatistics(array $filters = []): array
    {
        $sql = "SELECT
                    COUNT(*) as total_payments,
                    SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_payments,
                    SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_payments,
                    SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed_payments,
                    SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END) as total_revenue,
                    SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) as pending_amount,
                    SUM(CASE WHEN status = 'failed' THEN amount ELSE 0 END) as failed_amount,
                    AVG(CASE WHEN status = 'completed' THEN amount ELSE NULL END) as average_payment
                FROM {$this->table}
                WHERE 1=1";

        $params = [];

        if (!empty($filters['from_date'])) {
            $sql .= " AND created_at >= ?";
            $params[] = $filters['from_date'];
        }

        if (!empty($filters['to_date'])) {
            $sql .= " AND created_at <= ?";
            $params[] = $filters['to_date'];
        }

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Generate unique payment reference
     *
     * @param string $prefix Prefix for reference
     * @return string Unique reference
     */
    public function generateReference(string $prefix = 'PAY'): string
    {
        do {
            $reference = $prefix . '-' . time() . '-' . strtoupper(substr(md5(uniqid((string) rand(), true)), 0, 8));
            $existing = $this->findByReference($reference);
        } while ($existing !== null);

        return $reference;
    }

    /**
     * Format payment data
     *
     * @param array $payment Raw payment data
     * @return array Formatted payment data
     */
    private function formatPayment(array $payment): array
    {
        if (isset($payment['metadata']) && is_string($payment['metadata'])) {
            $payment['metadata'] = json_decode($payment['metadata'], true);
        }

        if (isset($payment['payment_gateway_response']) && is_string($payment['payment_gateway_response'])) {
            $payment['payment_gateway_response'] = json_decode($payment['payment_gateway_response'], true);
        }

        // Format amounts
        $payment['amount'] = (float) $payment['amount'];

        return $payment;
    }

    /**
     * Delete payment (soft delete by updating status)
     *
     * @param int $id Payment ID
     * @return bool Success status
     */
    public function delete(int $id): bool
    {
        return $this->updateStatus($id, 'cancelled');
    }

    /**
     * Get revenue by period
     */
    public function getRevenueByPeriod(string $period = '30days'): array {
        $days = match($period) {
            '7days' => 7,
            '30days' => 30,
            '90days' => 90,
            'year' => 365,
            default => 30
        };

        $stmt = $this->db->prepare(
            "SELECT
                DATE(created_at) as date,
                SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END) as revenue,
                COUNT(*) as payment_count,
                SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as successful_count
             FROM {$this->table}
             WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
             GROUP BY DATE(created_at)
             ORDER BY date ASC"
        );

        $stmt->execute([$days]);
        return $stmt->fetchAll();
    }

    /**
     * Get all payments with filtering
     */
    public function getAll(string $status = '', string $payment_method = '', int $limit = 100, int $offset = 0): array {
        $sql = "SELECT p.*,
                       q.quote_number,
                       CONCAT(u.first_name, ' ', u.last_name) as client_name
                FROM {$this->table} p
                LEFT JOIN quotes q ON p.quote_id = q.id
                LEFT JOIN users u ON q.user_id = u.id
                WHERE 1=1";
        $params = [];

        if (!empty($status)) {
            $sql .= " AND p.status = ?";
            $params[] = $status;
        }

        if (!empty($payment_method)) {
            $sql .= " AND p.payment_method = ?";
            $params[] = $payment_method;
        }

        $sql .= " ORDER BY p.created_at DESC LIMIT ? OFFSET ?";
        $params[] = $limit;
        $params[] = $offset;

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);

        return $stmt->fetchAll();
    }

    /**
     * Get recent payments
     */
    public function getRecent(int $limit = 5): array {
        $stmt = $this->db->prepare(
            "SELECT p.*,
                    q.quote_number,
                    CONCAT(u.first_name, ' ', u.last_name) as client_name
             FROM {$this->table} p
             LEFT JOIN quotes q ON p.quote_id = q.id
             LEFT JOIN users u ON q.user_id = u.id
             ORDER BY p.created_at DESC
             LIMIT ?"
        );

        $stmt->execute([$limit]);
        return $stmt->fetchAll();
    }
}
