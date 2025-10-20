<?php
declare(strict_types=1);

namespace App\Models;

/**
 * Project Model
 */
class Project extends BaseModel {
    protected string $table = 'projects';

    /**
     * Get all projects with filtering
     */
    public function getAll(string $status = '', int $clientId = 0, int $limit = 20, int $offset = 0): array {
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

        if ($clientId > 0) {
            $sql .= " AND q.user_id = ?";
            $params[] = $clientId;
        }

        $sql .= " ORDER BY p.created_at DESC LIMIT ? OFFSET ?";
        $params[] = $limit;
        $params[] = $offset;

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);

        return $stmt->fetchAll();
    }

    /**
     * Count projects with filtering
     */
    public function count(string $status = '', int $clientId = 0): int {
        $sql = "SELECT COUNT(*) FROM {$this->table} p";
        $params = [];

        if ($clientId > 0) {
            $sql .= " LEFT JOIN quotes q ON p.quote_id = q.id WHERE q.user_id = ?";
            $params[] = $clientId;

            if (!empty($status)) {
                $sql .= " AND p.status = ?";
                $params[] = $status;
            }
        } else {
            if (!empty($status)) {
                $sql .= " WHERE p.status = ?";
                $params[] = $status;
            }
        }

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);

        return (int)$stmt->fetchColumn();
    }

    /**
     * Get projects by user ID
     */
    public function getByUserId(int $userId, string $status = ''): array {
        $sql = "SELECT p.*,
                       q.quote_number
                FROM {$this->table} p
                LEFT JOIN quotes q ON p.quote_id = q.id
                WHERE q.user_id = ?";
        $params = [$userId];

        if (!empty($status)) {
            $sql .= " AND p.status = ?";
            $params[] = $status;
        }

        $sql .= " ORDER BY p.created_at DESC";

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);

        return $stmt->fetchAll();
    }

    /**
     * Create new project
     */
    public function create(array $data): int {
        $fields = ['quote_id', 'name', 'description', 'start_date', 'end_date', 'budget', 'status'];
        $values = [];
        $placeholders = [];

        foreach ($fields as $field) {
            if (isset($data[$field])) {
                $values[] = $data[$field];
                $placeholders[] = '?';
            }
        }

        $sql = "INSERT INTO {$this->table} (" . implode(', ', $fields) . ")
                VALUES (" . implode(', ', $placeholders) . ")";

        $stmt = $this->db->prepare($sql);
        $stmt->execute($values);

        return (int)$this->db->lastInsertId();
    }

    /**
     * Update project
     */
    public function update(int $id, array $data): bool {
        $fields = [];
        $values = [];

        $allowedFields = ['name', 'description', 'start_date', 'end_date', 'budget', 'status', 'progress'];

        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                $fields[] = "{$field} = ?";
                $values[] = $data[$field];
            }
        }

        if (empty($fields)) {
            return false;
        }

        $values[] = $id;

        $sql = "UPDATE {$this->table} SET " . implode(', ', $fields) . " WHERE id = ?";

        $stmt = $this->db->prepare($sql);
        return $stmt->execute($values);
    }

    /**
     * Update project status
     */
    public function updateStatus(int $id, string $status): bool {
        $stmt = $this->db->prepare("UPDATE {$this->table} SET status = ? WHERE id = ?");
        return $stmt->execute([$status, $id]);
    }

    /**
     * Get project statistics
     */
    public function getStatistics(): array {
        $stmt = $this->db->prepare(
            "SELECT
                COUNT(*) as total,
                SUM(CASE WHEN status = 'planning' THEN 1 ELSE 0 END) as planning,
                SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as in_progress,
                SUM(CASE WHEN status = 'on_hold' THEN 1 ELSE 0 END) as on_hold,
                SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
                SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled
             FROM {$this->table}"
        );

        $stmt->execute();

        return $stmt->fetch() ?: [
            'total' => 0,
            'planning' => 0,
            'in_progress' => 0,
            'on_hold' => 0,
            'completed' => 0,
            'cancelled' => 0
        ];
    }

    /**
     * Get recent projects
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

    /**
     * Delete project
     */
    public function delete(int $id): bool {
        $stmt = $this->db->prepare("DELETE FROM {$this->table} WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
