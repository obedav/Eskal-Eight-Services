<?php
declare(strict_types=1);

namespace App\Models;

use PDO;
use Exception;

/**
 * Document Model
 *
 * Handles all document-related database operations
 */
class Document extends BaseModel
{
    protected string $table = 'documents';

    /**
     * Create a new document record
     *
     * @param array $data Document data
     * @return array|null Created document record
     */
    public function create(array $data): ?array
    {
        try {
            $sql = "INSERT INTO {$this->table}
                    (user_id, quote_id, project_id, filename, original_filename,
                     file_path, file_type, file_size, document_type, uploaded_by)
                    VALUES (:user_id, :quote_id, :project_id, :filename, :original_filename,
                            :file_path, :file_type, :file_size, :document_type, :uploaded_by)";

            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                'user_id' => $data['user_id'] ?? null,
                'quote_id' => $data['quote_id'] ?? null,
                'project_id' => $data['project_id'] ?? null,
                'filename' => $data['filename'],
                'original_filename' => $data['original_filename'],
                'file_path' => $data['file_path'],
                'file_type' => $data['file_type'],
                'file_size' => $data['file_size'],
                'document_type' => $data['document_type'] ?? 'general',
                'uploaded_by' => $data['uploaded_by'],
            ]);

            $documentId = (int) $this->db->lastInsertId();
            return $this->findById($documentId);
        } catch (Exception $e) {
            error_log('Document creation error: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Find document by ID
     *
     * @param int $id Document ID
     * @return array|null Document record
     */
    public function findById(int $id): ?array
    {
        $stmt = $this->db->prepare(
            "SELECT d.*,
                    u.first_name, u.last_name, u.email,
                    q.quote_number,
                    p.project_number
             FROM {$this->table} d
             LEFT JOIN users u ON d.user_id = u.id
             LEFT JOIN quotes q ON d.quote_id = q.id
             LEFT JOIN projects p ON d.project_id = p.id
             WHERE d.id = ?"
        );
        $stmt->execute([$id]);
        $document = $stmt->fetch(PDO::FETCH_ASSOC);

        return $document ?: null;
    }

    /**
     * Get documents by user ID
     *
     * @param int $userId User ID
     * @param int $limit Limit
     * @param int $offset Offset
     * @return array Documents
     */
    public function getByUserId(int $userId, int $limit = 20, int $offset = 0): array
    {
        $sql = "SELECT d.*,
                       q.quote_number,
                       p.project_number
                FROM {$this->table} d
                LEFT JOIN quotes q ON d.quote_id = q.id
                LEFT JOIN projects p ON d.project_id = p.id
                WHERE d.user_id = ?
                ORDER BY d.created_at DESC
                LIMIT ? OFFSET ?";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([$userId, $limit, $offset]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Get documents by quote ID
     *
     * @param int $quoteId Quote ID
     * @return array Documents
     */
    public function getByQuoteId(int $quoteId): array
    {
        $stmt = $this->db->prepare(
            "SELECT * FROM {$this->table} WHERE quote_id = ? ORDER BY created_at DESC"
        );
        $stmt->execute([$quoteId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Get documents by project ID
     *
     * @param int $projectId Project ID
     * @return array Documents
     */
    public function getByProjectId(int $projectId): array
    {
        $stmt = $this->db->prepare(
            "SELECT * FROM {$this->table} WHERE project_id = ? ORDER BY created_at DESC"
        );
        $stmt->execute([$projectId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Delete a document
     *
     * @param int $documentId Document ID
     * @return bool Success status
     */
    public function delete(int $documentId): bool
    {
        try {
            $stmt = $this->db->prepare("DELETE FROM {$this->table} WHERE id = ?");
            return $stmt->execute([$documentId]);
        } catch (Exception $e) {
            error_log('Delete document error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Get all documents (admin)
     *
     * @param int $limit Limit
     * @param int $offset Offset
     * @return array Documents
     */
    public function getAll(int $limit = 20, int $offset = 0): array
    {
        $sql = "SELECT d.*,
                       u.first_name, u.last_name, u.email,
                       q.quote_number,
                       p.project_number
                FROM {$this->table} d
                LEFT JOIN users u ON d.user_id = u.id
                LEFT JOIN quotes q ON d.quote_id = q.id
                LEFT JOIN projects p ON d.project_id = p.id
                ORDER BY d.created_at DESC
                LIMIT ? OFFSET ?";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([$limit, $offset]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
