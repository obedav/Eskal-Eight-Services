<?php
declare(strict_types=1);

namespace App\Models;

use PDO;
use Exception;

/**
 * Message Model
 *
 * Handles all message-related database operations
 */
class Message extends BaseModel
{
    protected string $table = 'messages';

    /**
     * Create a new message
     *
     * @param array $data Message data
     * @return array|null Created message record
     */
    public function create(array $data): ?array
    {
        try {
            $sql = "INSERT INTO {$this->table}
                    (sender_id, recipient_id, subject, message, related_type, related_id, is_read, read_at)
                    VALUES (:sender_id, :recipient_id, :subject, :message, :related_type, :related_id, :is_read, :read_at)";

            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                'sender_id' => $data['sender_id'],
                'recipient_id' => $data['recipient_id'],
                'subject' => $data['subject'] ?? null,
                'message' => $data['message'],
                'related_type' => $data['related_type'] ?? null,
                'related_id' => $data['related_id'] ?? null,
                'is_read' => $data['is_read'] ?? 0,
                'read_at' => $data['read_at'] ?? null,
            ]);

            $messageId = (int) $this->db->lastInsertId();
            return $this->findById($messageId);
        } catch (Exception $e) {
            error_log('Message creation error: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Find message by ID
     *
     * @param int $id Message ID
     * @return array|null Message record
     */
    public function findById(int $id): ?array
    {
        $stmt = $this->db->prepare(
            "SELECT m.*,
                    sender.first_name as sender_first_name,
                    sender.last_name as sender_last_name,
                    sender.email as sender_email,
                    recipient.first_name as recipient_first_name,
                    recipient.last_name as recipient_last_name,
                    recipient.email as recipient_email
             FROM {$this->table} m
             LEFT JOIN users sender ON m.sender_id = sender.id
             LEFT JOIN users recipient ON m.recipient_id = recipient.id
             WHERE m.id = ?"
        );
        $stmt->execute([$id]);
        $message = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($message) {
            $message['sender_name'] = trim($message['sender_first_name'] . ' ' . $message['sender_last_name']);
            $message['recipient_name'] = trim($message['recipient_first_name'] . ' ' . $message['recipient_last_name']);
        }

        return $message ?: null;
    }

    /**
     * Get all messages for a user (inbox)
     *
     * @param int $userId User ID
     * @param int $limit Number of messages to return
     * @param int $offset Offset for pagination
     * @return array Messages
     */
    public function getInbox(int $userId, int $limit = 20, int $offset = 0): array
    {
        $sql = "SELECT m.*,
                       sender.first_name as sender_first_name,
                       sender.last_name as sender_last_name,
                       sender.email as sender_email
                FROM {$this->table} m
                LEFT JOIN users sender ON m.sender_id = sender.id
                WHERE m.recipient_id = ?
                ORDER BY m.created_at DESC
                LIMIT ? OFFSET ?";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([$userId, $limit, $offset]);
        $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($messages as &$message) {
            $message['sender_name'] = trim($message['sender_first_name'] . ' ' . $message['sender_last_name']);
        }

        return $messages;
    }

    /**
     * Get all sent messages for a user
     *
     * @param int $userId User ID
     * @param int $limit Number of messages to return
     * @param int $offset Offset for pagination
     * @return array Messages
     */
    public function getSent(int $userId, int $limit = 20, int $offset = 0): array
    {
        $sql = "SELECT m.*,
                       recipient.first_name as recipient_first_name,
                       recipient.last_name as recipient_last_name,
                       recipient.email as recipient_email
                FROM {$this->table} m
                LEFT JOIN users recipient ON m.recipient_id = recipient.id
                WHERE m.sender_id = ?
                ORDER BY m.created_at DESC
                LIMIT ? OFFSET ?";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([$userId, $limit, $offset]);
        $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($messages as &$message) {
            $message['recipient_name'] = trim($message['recipient_first_name'] . ' ' . $message['recipient_last_name']);
        }

        return $messages;
    }

    /**
     * Get unread message count for a user
     *
     * @param int $userId User ID
     * @return int Unread message count
     */
    public function getUnreadCount(int $userId): int
    {
        $stmt = $this->db->prepare(
            "SELECT COUNT(*) as count
             FROM {$this->table}
             WHERE recipient_id = ? AND is_read = 0"
        );
        $stmt->execute([$userId]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return (int) ($result['count'] ?? 0);
    }

    /**
     * Mark message as read
     *
     * @param int $messageId Message ID
     * @return bool Success status
     */
    public function markAsRead(int $messageId): bool
    {
        try {
            $stmt = $this->db->prepare(
                "UPDATE {$this->table}
                 SET is_read = 1, read_at = NOW()
                 WHERE id = ?"
            );
            return $stmt->execute([$messageId]);
        } catch (Exception $e) {
            error_log('Mark message as read error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Mark all messages as read for a user
     *
     * @param int $userId User ID
     * @return bool Success status
     */
    public function markAllAsRead(int $userId): bool
    {
        try {
            $stmt = $this->db->prepare(
                "UPDATE {$this->table}
                 SET is_read = 1, read_at = NOW()
                 WHERE recipient_id = ? AND is_read = 0"
            );
            return $stmt->execute([$userId]);
        } catch (Exception $e) {
            error_log('Mark all messages as read error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Delete a message
     *
     * @param int $messageId Message ID
     * @return bool Success status
     */
    public function delete(int $messageId): bool
    {
        try {
            $stmt = $this->db->prepare("DELETE FROM {$this->table} WHERE id = ?");
            return $stmt->execute([$messageId]);
        } catch (Exception $e) {
            error_log('Delete message error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Get message statistics
     *
     * @return array Statistics
     */
    public function getStatistics(): array
    {
        $stmt = $this->db->prepare(
            "SELECT
                COUNT(*) as total_messages,
                SUM(CASE WHEN is_read = 0 THEN 1 ELSE 0 END) as unread_messages,
                SUM(CASE WHEN is_read = 1 THEN 1 ELSE 0 END) as read_messages,
                COUNT(DISTINCT sender_id) as unique_senders
             FROM {$this->table}"
        );
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: [
            'total_messages' => 0,
            'unread_messages' => 0,
            'read_messages' => 0,
            'unique_senders' => 0,
        ];
    }

    /**
     * Get total unread messages count for admin (all users)
     *
     * @return int Total unread messages
     */
    public function getTotalUnreadForAdmin(): int
    {
        $stmt = $this->db->prepare(
            "SELECT COUNT(*) as count
             FROM {$this->table} m
             INNER JOIN users u ON m.sender_id = u.id
             WHERE m.is_read = 0 AND u.role = 'client'"
        );
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return (int) ($result['count'] ?? 0);
    }
}
