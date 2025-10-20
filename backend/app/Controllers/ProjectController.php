<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Models\Project;
use App\Helpers\Response;
use App\Helpers\Validator;

/**
 * Project Controller
 */
class ProjectController extends BaseController {
    private Project $projectModel;

    public function __construct() {
        parent::__construct();
        $this->projectModel = new Project();
    }

    /**
     * Get all projects
     * GET /api/projects
     */
    public function getAll(): void {
        try {
            $status = $_GET['status'] ?? '';
            $clientId = (int)($_GET['client_id'] ?? 0);
            $page = (int)($_GET['page'] ?? 1);
            $limit = (int)($_GET['limit'] ?? 20);
            $offset = ($page - 1) * $limit;

            $projects = $this->projectModel->getAll($status, $clientId, $limit, $offset);
            $total = $this->projectModel->count($status, $clientId);

            Response::success([
                'projects' => $projects,
                'pagination' => [
                    'page' => $page,
                    'limit' => $limit,
                    'total' => $total,
                    'pages' => ceil($total / $limit)
                ]
            ], 'Projects retrieved successfully');

        } catch (\Exception $e) {
            error_log("Get Projects Error: " . $e->getMessage());
            Response::error('Failed to retrieve projects', null, 500);
        }
    }

    /**
     * Get user's projects
     * GET /api/projects/my
     */
    public function getMyProjects(): void {
        try {
            $userId = $this->user['user_id'] ?? 0;
            $status = $_GET['status'] ?? '';

            $projects = $this->projectModel->getByUserId($userId, $status);

            Response::success($projects, 'Projects retrieved successfully');

        } catch (\Exception $e) {
            error_log("Get My Projects Error: " . $e->getMessage());
            Response::error('Failed to retrieve projects', null, 500);
        }
    }

    /**
     * Get single project
     * GET /api/projects/:id
     */
    public function getOne(): void {
        try {
            $id = $this->getInt('id');

            if (!$id) {
                Response::error('Project ID is required', null, 400);
            }

            $project = $this->projectModel->findById($id);

            if (!$project) {
                Response::error('Project not found', null, 404);
            }

            // Check authorization - user can only view their own projects unless admin
            if ($this->user['role'] !== 'admin' && $this->user['role'] !== 'super_admin') {
                if ($project['user_id'] != $this->user['user_id']) {
                    Response::error('Unauthorized', null, 403);
                }
            }

            Response::success($project, 'Project retrieved successfully');

        } catch (\Exception $e) {
            error_log("Get Project Error: " . $e->getMessage());
            Response::error('Failed to retrieve project', null, 500);
        }
    }

    /**
     * Create project (Admin only)
     * POST /api/projects
     */
    public function create(): void {
        try {
            $data = [
                'quote_id' => $this->getInt('quote_id'),
                'name' => $this->getString('name'),
                'description' => $this->getString('description'),
                'start_date' => $this->getString('start_date'),
                'end_date' => $this->getString('end_date'),
                'budget' => $this->getFloat('budget'),
                'status' => $this->getString('status') ?: 'planning'
            ];

            // Validate required fields
            if (!$data['quote_id'] || !$data['name'] || !$data['start_date']) {
                Response::error('Quote ID, name, and start date are required', null, 400);
            }

            $projectId = $this->projectModel->create($data);

            if ($projectId) {
                $project = $this->projectModel->findById($projectId);
                Response::success($project, 'Project created successfully', 201);
            } else {
                Response::error('Failed to create project', null, 500);
            }

        } catch (\Exception $e) {
            error_log("Create Project Error: " . $e->getMessage());
            Response::error('Failed to create project', null, 500);
        }
    }

    /**
     * Update project (Admin only)
     * PUT /api/projects/:id
     */
    public function update(): void {
        try {
            $id = $this->getInt('id');

            if (!$id) {
                Response::error('Project ID is required', null, 400);
            }

            $data = [];
            if ($this->has('name')) $data['name'] = $this->getString('name');
            if ($this->has('description')) $data['description'] = $this->getString('description');
            if ($this->has('start_date')) $data['start_date'] = $this->getString('start_date');
            if ($this->has('end_date')) $data['end_date'] = $this->getString('end_date');
            if ($this->has('budget')) $data['budget'] = $this->getFloat('budget');
            if ($this->has('status')) $data['status'] = $this->getString('status');
            if ($this->has('progress')) $data['progress'] = $this->getInt('progress');

            $updated = $this->projectModel->update($id, $data);

            if ($updated) {
                $project = $this->projectModel->findById($id);
                Response::success($project, 'Project updated successfully');
            } else {
                Response::error('Failed to update project', null, 500);
            }

        } catch (\Exception $e) {
            error_log("Update Project Error: " . $e->getMessage());
            Response::error('Failed to update project', null, 500);
        }
    }

    /**
     * Update project status (Admin only)
     * PUT /api/projects/:id/status
     */
    public function updateStatus(): void {
        try {
            $id = $this->getInt('id');
            $status = $this->getString('status');

            if (!$id || !$status) {
                Response::error('Project ID and status are required', null, 400);
            }

            $validStatuses = ['planning', 'in_progress', 'on_hold', 'completed', 'cancelled'];
            if (!in_array($status, $validStatuses)) {
                Response::error('Invalid status', null, 400);
            }

            $updated = $this->projectModel->updateStatus($id, $status);

            if ($updated) {
                Response::success(null, 'Project status updated successfully');
            } else {
                Response::error('Failed to update project status', null, 500);
            }

        } catch (\Exception $e) {
            error_log("Update Project Status Error: " . $e->getMessage());
            Response::error('Failed to update project status', null, 500);
        }
    }

    /**
     * Get project statistics (Admin only)
     * GET /api/projects/statistics
     */
    public function getStatistics(): void {
        try {
            $stats = $this->projectModel->getStatistics();

            Response::success($stats, 'Project statistics retrieved successfully');

        } catch (\Exception $e) {
            error_log("Get Project Statistics Error: " . $e->getMessage());
            Response::error('Failed to retrieve project statistics', null, 500);
        }
    }

    /**
     * Delete project (Admin only)
     * DELETE /api/projects/:id
     */
    public function delete(): void {
        try {
            $id = $this->getInt('id');

            if (!$id) {
                Response::error('Project ID is required', null, 400);
            }

            $deleted = $this->projectModel->delete($id);

            if ($deleted) {
                Response::success(null, 'Project deleted successfully');
            } else {
                Response::error('Failed to delete project', null, 500);
            }

        } catch (\Exception $e) {
            error_log("Delete Project Error: " . $e->getMessage());
            Response::error('Failed to delete project', null, 500);
        }
    }
}
