<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Models\User;
use App\Helpers\Response;
use App\Helpers\Validator;

/**
 * User Controller - Manages users/clients
 */
class UserController extends BaseController {
    private User $userModel;

    public function __construct() {
        parent::__construct();
        $this->userModel = new User();
    }

    /**
     * Get all users (Admin only)
     * GET /api/users
     */
    public function getAll(): void {
        try {
            $role = $_GET['role'] ?? '';
            $status = $_GET['status'] ?? '';
            $search = $_GET['search'] ?? '';
            $page = (int)($_GET['page'] ?? 1);
            $limit = (int)($_GET['limit'] ?? 50);
            $offset = ($page - 1) * $limit;

            $users = $this->userModel->getAll($role, $status, $search, $limit, $offset);
            $total = $this->userModel->countFiltered($role, $status, $search);

            Response::success([
                'users' => $users,
                'pagination' => [
                    'page' => $page,
                    'limit' => $limit,
                    'total' => $total,
                    'pages' => ceil($total / $limit)
                ]
            ], 'Users retrieved successfully');

        } catch (\Exception $e) {
            error_log("Get Users Error: " . $e->getMessage());
            Response::error('Failed to retrieve users', null, 500);
        }
    }

    /**
     * Get user by ID (Admin only)
     * GET /api/users/:id
     */
    public function getOne(): void {
        try {
            $id = $this->getInt('id');

            if (!$id) {
                Response::error('User ID is required', null, 400);
            }

            $user = $this->userModel->findById($id);

            if (!$user) {
                Response::error('User not found', null, 404);
            }

            $userData = $this->userModel->getSafeUserData($user);

            Response::success($userData, 'User retrieved successfully');

        } catch (\Exception $e) {
            error_log("Get User Error: " . $e->getMessage());
            Response::error('Failed to retrieve user', null, 500);
        }
    }

    /**
     * Get user statistics (Admin only)
     * GET /api/users/statistics
     */
    public function getStatistics(): void {
        try {
            $stats = $this->userModel->getStatistics();

            Response::success($stats, 'User statistics retrieved successfully');

        } catch (\Exception $e) {
            error_log("Get User Statistics Error: " . $e->getMessage());
            Response::error('Failed to retrieve user statistics', null, 500);
        }
    }

    /**
     * Update user status (Admin only)
     * PUT /api/users/:id/status
     */
    public function updateStatus(): void {
        try {
            $id = $this->getInt('id');
            $status = $this->getString('status');

            if (!$id || !$status) {
                Response::error('User ID and status are required', null, 400);
            }

            if (!in_array($status, [STATUS_ACTIVE, STATUS_INACTIVE, STATUS_SUSPENDED])) {
                Response::error('Invalid status', null, 400);
            }

            $updated = $this->userModel->updateStatus($id, $status);

            if ($updated) {
                Response::success(null, 'User status updated successfully');
            } else {
                Response::error('Failed to update user status', null, 500);
            }

        } catch (\Exception $e) {
            error_log("Update User Status Error: " . $e->getMessage());
            Response::error('Failed to update user status', null, 500);
        }
    }

    /**
     * Delete user (Admin only)
     * DELETE /api/users/:id
     */
    public function delete(): void {
        try {
            $id = $this->getInt('id');

            if (!$id) {
                Response::error('User ID is required', null, 400);
            }

            // Prevent deleting self
            if ($this->user && $this->user['user_id'] == $id) {
                Response::error('Cannot delete your own account', null, 400);
            }

            $deleted = $this->userModel->delete($id);

            if ($deleted) {
                Response::success(null, 'User deleted successfully');
            } else {
                Response::error('Failed to delete user', null, 500);
            }

        } catch (\Exception $e) {
            error_log("Delete User Error: " . $e->getMessage());
            Response::error('Failed to delete user', null, 500);
        }
    }
}
