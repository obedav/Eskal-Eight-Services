<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Models\Message;
use App\Helpers\Response;

/**
 * Message Controller - Handles message operations
 */
class MessageController extends BaseController
{
    private Message $messageModel;

    public function __construct()
    {
        parent::__construct();
        $this->messageModel = new Message();
    }

    /**
     * Get inbox messages for the authenticated user
     * GET /api/messages/inbox
     */
    public function getInbox(): void
    {
        try {
            $limit = (int) ($_GET['limit'] ?? 20);
            $offset = (int) ($_GET['offset'] ?? 0);

            $messages = $this->messageModel->getInbox($this->user['id'], $limit, $offset);

            Response::success([
                'messages' => $messages,
                'total' => count($messages),
            ], 'Inbox messages retrieved successfully');
        } catch (\Exception $e) {
            error_log("Get inbox error: " . $e->getMessage());
            Response::error('Failed to retrieve inbox messages', null, 500);
        }
    }

    /**
     * Get sent messages for the authenticated user
     * GET /api/messages/sent
     */
    public function getSent(): void
    {
        try {
            $limit = (int) ($_GET['limit'] ?? 20);
            $offset = (int) ($_GET['offset'] ?? 0);

            $messages = $this->messageModel->getSent($this->user['id'], $limit, $offset);

            Response::success([
                'messages' => $messages,
                'total' => count($messages),
            ], 'Sent messages retrieved successfully');
        } catch (\Exception $e) {
            error_log("Get sent messages error: " . $e->getMessage());
            Response::error('Failed to retrieve sent messages', null, 500);
        }
    }

    /**
     * Get a specific message by ID
     * GET /api/messages/:id
     */
    public function getById(int $id): void
    {
        try {
            $message = $this->messageModel->findById($id);

            if (!$message) {
                Response::error('Message not found', null, 404);
                return;
            }

            // Check if user has access to this message
            if ($message['sender_id'] !== $this->user['id'] && $message['recipient_id'] !== $this->user['id']) {
                Response::error('Unauthorized access to this message', null, 403);
                return;
            }

            // Mark as read if recipient is viewing
            if ($message['recipient_id'] === $this->user['id'] && !$message['is_read']) {
                $this->messageModel->markAsRead($id);
                $message['is_read'] = 1;
            }

            Response::success($message, 'Message retrieved successfully');
        } catch (\Exception $e) {
            error_log("Get message error: " . $e->getMessage());
            Response::error('Failed to retrieve message', null, 500);
        }
    }

    /**
     * Send a new message
     * POST /api/messages
     */
    public function create(): void
    {
        try {
            $data = $this->getJsonInput();

            // Validate required fields
            if (empty($data['recipient_id']) || empty($data['message'])) {
                Response::error('Recipient and message are required', null, 400);
                return;
            }

            $messageData = [
                'sender_id' => $this->user['id'],
                'recipient_id' => (int) $data['recipient_id'],
                'subject' => $data['subject'] ?? null,
                'message' => $data['message'],
                'related_type' => $data['related_type'] ?? null,
                'related_id' => $data['related_id'] ?? null,
            ];

            $message = $this->messageModel->create($messageData);

            if (!$message) {
                Response::error('Failed to send message', null, 500);
                return;
            }

            Response::success($message, 'Message sent successfully', 201);
        } catch (\Exception $e) {
            error_log("Create message error: " . $e->getMessage());
            Response::error('Failed to send message', null, 500);
        }
    }

    /**
     * Get unread message count
     * GET /api/messages/unread-count
     */
    public function getUnreadCount(): void
    {
        try {
            $count = $this->messageModel->getUnreadCount($this->user['id']);

            Response::success(['count' => $count], 'Unread count retrieved successfully');
        } catch (\Exception $e) {
            error_log("Get unread count error: " . $e->getMessage());
            Response::error('Failed to retrieve unread count', null, 500);
        }
    }

    /**
     * Mark message as read
     * PUT /api/messages/:id/mark-read
     */
    public function markAsRead(int $id): void
    {
        try {
            $message = $this->messageModel->findById($id);

            if (!$message) {
                Response::error('Message not found', null, 404);
                return;
            }

            // Check if user is the recipient
            if ($message['recipient_id'] !== $this->user['id']) {
                Response::error('Unauthorized access to this message', null, 403);
                return;
            }

            $success = $this->messageModel->markAsRead($id);

            if ($success) {
                Response::success(null, 'Message marked as read');
            } else {
                Response::error('Failed to mark message as read', null, 500);
            }
        } catch (\Exception $e) {
            error_log("Mark as read error: " . $e->getMessage());
            Response::error('Failed to mark message as read', null, 500);
        }
    }

    /**
     * Mark all messages as read
     * PUT /api/messages/mark-all-read
     */
    public function markAllAsRead(): void
    {
        try {
            $success = $this->messageModel->markAllAsRead($this->user['id']);

            if ($success) {
                Response::success(null, 'All messages marked as read');
            } else {
                Response::error('Failed to mark messages as read', null, 500);
            }
        } catch (\Exception $e) {
            error_log("Mark all as read error: " . $e->getMessage());
            Response::error('Failed to mark messages as read', null, 500);
        }
    }

    /**
     * Delete a message
     * DELETE /api/messages/:id
     */
    public function delete(int $id): void
    {
        try {
            $message = $this->messageModel->findById($id);

            if (!$message) {
                Response::error('Message not found', null, 404);
                return;
            }

            // Check if user has access to delete this message
            if ($message['sender_id'] !== $this->user['id'] && $message['recipient_id'] !== $this->user['id']) {
                Response::error('Unauthorized to delete this message', null, 403);
                return;
            }

            $success = $this->messageModel->delete($id);

            if ($success) {
                Response::success(null, 'Message deleted successfully');
            } else {
                Response::error('Failed to delete message', null, 500);
            }
        } catch (\Exception $e) {
            error_log("Delete message error: " . $e->getMessage());
            Response::error('Failed to delete message', null, 500);
        }
    }

    /**
     * Get total unread messages for admin (from all clients)
     * GET /api/messages/admin/unread-count
     */
    public function getAdminUnreadCount(): void
    {
        try {
            $count = $this->messageModel->getTotalUnreadForAdmin();

            Response::success(['count' => $count], 'Admin unread count retrieved successfully');
        } catch (\Exception $e) {
            error_log("Get admin unread count error: " . $e->getMessage());
            Response::error('Failed to retrieve unread count', null, 500);
        }
    }
}
