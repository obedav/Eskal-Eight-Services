<?php
declare(strict_types=1);

namespace App\Models;

/**
 * Quote Model
 */
class Quote extends BaseModel {
    protected string $table = 'quotes';

    /**
     * Create quote with auto-generated quote number
     */
    public function createQuote(array $data): int {
        // Generate quote number if not provided
        if (!isset($data['quote_number'])) {
            $data['quote_number'] = $this->generateQuoteNumber();
        }

        // Set default status
        if (!isset($data['status'])) {
            $data['status'] = 'pending';
        }

        // Set default currency
        if (!isset($data['currency'])) {
            $data['currency'] = CURRENCY;
        }

        // Set valid_until date (30 days from now)
        if (!isset($data['valid_until']) && defined('QUOTE_VALIDITY_DAYS')) {
            $data['valid_until'] = date('Y-m-d', strtotime('+' . QUOTE_VALIDITY_DAYS . ' days'));
        }

        $quoteId = $this->create($data);

        // Log activity
        $this->logActivity($quoteId, $data['user_id'], 'created', 'Quote request submitted');

        return $quoteId;
    }

    /**
     * Generate unique quote number
     */
    private function generateQuoteNumber(): string {
        $prefix = defined('QUOTE_PREFIX') ? QUOTE_PREFIX : 'QT';
        $year = date('Y');
        $month = date('m');

        // Get count of quotes this month
        $stmt = $this->db->prepare(
            "SELECT COUNT(*) as count FROM {$this->table}
             WHERE YEAR(created_at) = ? AND MONTH(created_at) = ?"
        );
        $stmt->execute([$year, $month]);
        $result = $stmt->fetch();
        $count = ($result['count'] ?? 0) + 1;

        return sprintf('%s-%s%s-%04d', $prefix, $year, $month, $count);
    }

    /**
     * Get quotes by user ID
     */
    public function getByUserId(int $userId, int $limit = 100, int $offset = 0): array {
        $stmt = $this->db->prepare(
            "SELECT q.*, s.title as service_title, s.icon as service_icon
             FROM {$this->table} q
             LEFT JOIN services s ON q.service_id = s.id
             WHERE q.user_id = ?
             ORDER BY q.created_at DESC
             LIMIT ? OFFSET ?"
        );
        $stmt->execute([$userId, $limit, $offset]);
        return $stmt->fetchAll();
    }

    /**
     * Get quotes by status
     */
    public function getByStatus(string $status, int $limit = 100, int $offset = 0): array {
        $stmt = $this->db->prepare(
            "SELECT q.*,
                    s.title as service_title,
                    s.icon as service_icon,
                    u.first_name,
                    u.last_name,
                    u.email as user_email
             FROM {$this->table} q
             LEFT JOIN services s ON q.service_id = s.id
             LEFT JOIN users u ON q.user_id = u.id
             WHERE q.status = ?
             ORDER BY q.created_at DESC
             LIMIT ? OFFSET ?"
        );
        $stmt->execute([$status, $limit, $offset]);
        return $stmt->fetchAll();
    }

    /**
     * Get quote by quote number
     */
    public function findByQuoteNumber(string $quoteNumber): ?array {
        $stmt = $this->db->prepare(
            "SELECT q.*,
                    s.title as service_title,
                    s.icon as service_icon,
                    u.first_name,
                    u.last_name,
                    u.email as user_email,
                    r.first_name as reviewer_first_name,
                    r.last_name as reviewer_last_name
             FROM {$this->table} q
             LEFT JOIN services s ON q.service_id = s.id
             LEFT JOIN users u ON q.user_id = u.id
             LEFT JOIN users r ON q.reviewed_by = r.id
             WHERE q.quote_number = ?
             LIMIT 1"
        );
        $stmt->execute([$quoteNumber]);
        $result = $stmt->fetch();
        return $result ?: null;
    }

    /**
     * Update quote status
     */
    public function updateStatus(int $quoteId, string $newStatus, int $userId, ?string $notes = null): bool {
        // Get current quote
        $quote = $this->find($quoteId);
        if (!$quote) {
            return false;
        }

        $oldStatus = $quote['status'];

        // Update quote
        $updateData = [
            'status' => $newStatus,
            'reviewed_by' => $userId,
            'reviewed_at' => date('Y-m-d H:i:s')
        ];

        if ($notes) {
            $updateData['admin_notes'] = $notes;
        }

        $success = $this->update($quoteId, $updateData);

        if ($success) {
            // Log activity
            $this->logActivity(
                $quoteId,
                $userId,
                'status_changed',
                "Status changed from {$oldStatus} to {$newStatus}",
                $oldStatus,
                $newStatus
            );
        }

        return $success;
    }

    /**
     * Set quote amount
     */
    public function setAmount(int $quoteId, float $amount, int $userId): bool {
        $success = $this->update($quoteId, ['amount' => $amount]);

        if ($success) {
            $this->logActivity(
                $quoteId,
                $userId,
                'amount_set',
                "Quote amount set to " . CURRENCY . " " . number_format($amount, 2)
            );
        }

        return $success;
    }

    /**
     * Log quote activity
     */
    private function logActivity(
        int $quoteId,
        ?int $userId,
        string $action,
        string $description,
        ?string $oldStatus = null,
        ?string $newStatus = null
    ): bool {
        $stmt = $this->db->prepare(
            "INSERT INTO quote_activities
             (quote_id, user_id, action, description, old_status, new_status)
             VALUES (?, ?, ?, ?, ?, ?)"
        );

        return $stmt->execute([
            $quoteId,
            $userId,
            $action,
            $description,
            $oldStatus,
            $newStatus
        ]);
    }

    /**
     * Get quote activities
     */
    public function getActivities(int $quoteId): array {
        $stmt = $this->db->prepare(
            "SELECT qa.*, u.first_name, u.last_name, u.email
             FROM quote_activities qa
             LEFT JOIN users u ON qa.user_id = u.id
             WHERE qa.quote_id = ?
             ORDER BY qa.created_at DESC"
        );
        $stmt->execute([$quoteId]);
        return $stmt->fetchAll();
    }

    /**
     * Add document to quote
     */
    public function addDocument(int $quoteId, array $documentData): int {
        $stmt = $this->db->prepare(
            "INSERT INTO quote_documents
             (quote_id, file_name, file_path, file_type, file_size, uploaded_by)
             VALUES (?, ?, ?, ?, ?, ?)"
        );

        $stmt->execute([
            $quoteId,
            $documentData['file_name'],
            $documentData['file_path'],
            $documentData['file_type'] ?? null,
            $documentData['file_size'] ?? null,
            $documentData['uploaded_by']
        ]);

        return (int) $this->db->lastInsertId();
    }

    /**
     * Get quote documents
     */
    public function getDocuments(int $quoteId): array {
        $stmt = $this->db->prepare(
            "SELECT qd.*, u.first_name, u.last_name
             FROM quote_documents qd
             LEFT JOIN users u ON qd.uploaded_by = u.id
             WHERE qd.quote_id = ?
             ORDER BY qd.created_at DESC"
        );
        $stmt->execute([$quoteId]);
        return $stmt->fetchAll();
    }

    /**
     * Get quote statistics
     */
    public function getStatistics(): array {
        $stmt = $this->db->query(
            "SELECT
                COUNT(*) as total,
                SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
                SUM(CASE WHEN status = 'in_review' THEN 1 ELSE 0 END) as in_review,
                SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
                SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected,
                SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
                SUM(CASE WHEN amount IS NOT NULL THEN amount ELSE 0 END) as total_value
             FROM {$this->table}"
        );

        return $stmt->fetch() ?: [];
    }

    /**
     * Search quotes
     */
    public function search(string $query, int $limit = 20, int $offset = 0): array {
        $searchTerm = "%{$query}%";

        $stmt = $this->db->prepare(
            "SELECT q.*,
                    s.title as service_title,
                    u.first_name,
                    u.last_name
             FROM {$this->table} q
             LEFT JOIN services s ON q.service_id = s.id
             LEFT JOIN users u ON q.user_id = u.id
             WHERE q.quote_number LIKE ?
             OR q.project_title LIKE ?
             OR q.description LIKE ?
             OR u.first_name LIKE ?
             OR u.last_name LIKE ?
             ORDER BY q.created_at DESC
             LIMIT ? OFFSET ?"
        );

        $stmt->execute([
            $searchTerm,
            $searchTerm,
            $searchTerm,
            $searchTerm,
            $searchTerm,
            $limit,
            $offset
        ]);

        return $stmt->fetchAll();
    }

    /**
     * Get quote trends by period
     */
    public function getTrendsByPeriod(string $period = '30days'): array {
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
                COUNT(*) as count,
                SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved_count
             FROM {$this->table}
             WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
             GROUP BY DATE(created_at)
             ORDER BY date ASC"
        );

        $stmt->execute([$days]);
        return $stmt->fetchAll();
    }

    /**
     * Get top clients by quote count
     */
    public function getTopClients(int $limit = 10): array {
        $stmt = $this->db->prepare(
            "SELECT
                u.id as user_id,
                CONCAT(u.first_name, ' ', u.last_name) as client_name,
                COUNT(q.id) as quote_count,
                SUM(CASE WHEN q.status = 'approved' THEN 1 ELSE 0 END) as approved_count
             FROM {$this->table} q
             LEFT JOIN users u ON q.user_id = u.id
             WHERE u.id IS NOT NULL
             GROUP BY u.id, u.first_name, u.last_name
             ORDER BY quote_count DESC
             LIMIT ?"
        );

        $stmt->execute([$limit]);
        return $stmt->fetchAll();
    }

    /**
     * Get service performance
     */
    public function getServicePerformance(string $period = '30days'): array {
        $days = match($period) {
            '7days' => 7,
            '30days' => 30,
            '90days' => 90,
            'year' => 365,
            default => 30
        };

        $stmt = $this->db->prepare(
            "SELECT
                s.id as service_id,
                s.name as service_name,
                COUNT(q.id) as quote_count,
                SUM(CASE WHEN q.status = 'approved' THEN 1 ELSE 0 END) as approved_count,
                SUM(CASE WHEN q.total_amount IS NOT NULL THEN q.total_amount ELSE 0 END) as total_amount
             FROM {$this->table} q
             LEFT JOIN services s ON q.service_id = s.id
             WHERE q.created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
             AND s.id IS NOT NULL
             GROUP BY s.id, s.name
             ORDER BY quote_count DESC"
        );

        $stmt->execute([$days]);
        return $stmt->fetchAll();
    }

    /**
     * Get recent quotes
     */
    public function getRecent(int $limit = 5): array {
        $stmt = $this->db->prepare(
            "SELECT q.*,
                    s.name as service_name,
                    CONCAT(u.first_name, ' ', u.last_name) as client_name
             FROM {$this->table} q
             LEFT JOIN services s ON q.service_id = s.id
             LEFT JOIN users u ON q.user_id = u.id
             ORDER BY q.created_at DESC
             LIMIT ?"
        );

        $stmt->execute([$limit]);
        return $stmt->fetchAll();
    }
}
