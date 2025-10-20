<?php
declare(strict_types=1);

namespace App\Models;

use PDO;

/**
 * Base Model Class
 * All models should extend this class
 */
abstract class BaseModel {
    protected PDO $db;
    protected string $table;
    protected string $primaryKey = 'id';

    public function __construct() {
        $this->db = \Database::getConnection();
    }

    /**
     * Find record by ID
     */
    public function find(int $id): ?array {
        $stmt = $this->db->prepare("SELECT * FROM {$this->table} WHERE {$this->primaryKey} = ? LIMIT 1");
        $stmt->execute([$id]);
        $result = $stmt->fetch();
        return $result ?: null;
    }

    /**
     * Find all records
     */
    public function findAll(int $limit = 100, int $offset = 0): array {
        $stmt = $this->db->prepare("SELECT * FROM {$this->table} LIMIT ? OFFSET ?");
        $stmt->execute([$limit, $offset]);
        return $stmt->fetchAll();
    }

    /**
     * Find record by column value
     */
    public function findBy(string $column, mixed $value): ?array {
        $stmt = $this->db->prepare("SELECT * FROM {$this->table} WHERE {$column} = ? LIMIT 1");
        $stmt->execute([$value]);
        $result = $stmt->fetch();
        return $result ?: null;
    }

    /**
     * Find multiple records by column value
     */
    public function findAllBy(string $column, mixed $value, int $limit = 100, int $offset = 0): array {
        $stmt = $this->db->prepare("SELECT * FROM {$this->table} WHERE {$column} = ? LIMIT ? OFFSET ?");
        $stmt->execute([$value, $limit, $offset]);
        return $stmt->fetchAll();
    }

    /**
     * Create new record
     */
    public function create(array $data): int {
        $columns = implode(', ', array_keys($data));
        $placeholders = implode(', ', array_fill(0, count($data), '?'));

        $stmt = $this->db->prepare("INSERT INTO {$this->table} ({$columns}) VALUES ({$placeholders})");
        $stmt->execute(array_values($data));

        return (int) $this->db->lastInsertId();
    }

    /**
     * Update record
     */
    public function update(int $id, array $data): bool {
        $setClause = implode(', ', array_map(fn($key) => "$key = ?", array_keys($data)));

        $stmt = $this->db->prepare("UPDATE {$this->table} SET {$setClause} WHERE {$this->primaryKey} = ?");
        return $stmt->execute([...array_values($data), $id]);
    }

    /**
     * Delete record
     */
    public function delete(int $id): bool {
        $stmt = $this->db->prepare("DELETE FROM {$this->table} WHERE {$this->primaryKey} = ?");
        return $stmt->execute([$id]);
    }

    /**
     * Count total records
     */
    public function count(array $where = []): int {
        if (empty($where)) {
            $stmt = $this->db->query("SELECT COUNT(*) as total FROM {$this->table}");
            $result = $stmt->fetch();
            return (int) $result['total'];
        }

        $whereClause = implode(' AND ', array_map(fn($key) => "$key = ?", array_keys($where)));
        $stmt = $this->db->prepare("SELECT COUNT(*) as total FROM {$this->table} WHERE {$whereClause}");
        $stmt->execute(array_values($where));
        $result = $stmt->fetch();
        return (int) $result['total'];
    }

    /**
     * Execute raw query
     */
    protected function query(string $sql, array $params = []): array {
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    /**
     * Execute raw query and return single row
     */
    protected function queryOne(string $sql, array $params = []): ?array {
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        $result = $stmt->fetch();
        return $result ?: null;
    }

    /**
     * Begin transaction
     */
    protected function beginTransaction(): bool {
        return $this->db->beginTransaction();
    }

    /**
     * Commit transaction
     */
    protected function commit(): bool {
        return $this->db->commit();
    }

    /**
     * Rollback transaction
     */
    protected function rollback(): bool {
        return $this->db->rollBack();
    }
}
