<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Models\Service;
use App\Helpers\Response;
use App\Exceptions\ValidationException;

/**
 * Service Controller
 */
class ServiceController extends BaseController {
    private Service $serviceModel;

    public function __construct() {
        parent::__construct();
        $this->serviceModel = new Service();
    }

    /**
     * Get all active services
     * GET /api/services
     */
    public function getAll(): void {
        $this->requireMethod('GET');

        try {
            $category = $this->getString('category');
            $pagination = $this->getPaginationParams();

            if ($category) {
                $services = $this->serviceModel->getByCategory(
                    $category,
                    $pagination['per_page'],
                    ($pagination['page'] - 1) * $pagination['per_page']
                );
            } else {
                $services = $this->serviceModel->getActiveServices(
                    $pagination['per_page'],
                    ($pagination['page'] - 1) * $pagination['per_page']
                );
            }

            Response::success(['services' => $services]);

        } catch (\Exception $e) {
            error_log("Get Services Error: " . $e->getMessage());
            Response::error('An error occurred', null, 500);
        }
    }

    /**
     * Get single service by ID or slug
     * GET /api/services/:id
     */
    public function getOne(): void {
        $this->requireMethod('GET');

        try {
            $identifier = $this->getString('id');

            if (empty($identifier)) {
                Response::error('Service identifier is required', null, 400);
            }

            // Try to find by ID first, then by slug
            if (is_numeric($identifier)) {
                $service = $this->serviceModel->find((int)$identifier);
            } else {
                $service = $this->serviceModel->findBySlug($identifier);
            }

            if (!$service) {
                Response::notFound('Service not found');
            }

            Response::success(['service' => $service]);

        } catch (\Exception $e) {
            error_log("Get Service Error: " . $e->getMessage());
            Response::error('An error occurred', null, 500);
        }
    }

    /**
     * Get all categories
     * GET /api/services/categories
     */
    public function getCategories(): void {
        $this->requireMethod('GET');

        try {
            $categories = $this->serviceModel->getCategories();
            Response::success(['categories' => $categories]);

        } catch (\Exception $e) {
            error_log("Get Categories Error: " . $e->getMessage());
            Response::error('An error occurred', null, 500);
        }
    }

    /**
     * Create service (admin)
     * POST /api/services
     */
    public function create(): void {
        $this->requireMethod('POST');
        $this->requireAdmin();

        try {
            $title = $this->getString('title');
            $category = $this->getString('category');
            $description = $this->getString('description');

            if (empty($title) || empty($category) || empty($description)) {
                throw new ValidationException('Title, category, and description are required');
            }

            $serviceData = [
                'title' => $title,
                'category' => $category,
                'description' => $description,
                'short_description' => $this->getString('short_description'),
                'icon' => $this->getString('icon'),
                'features' => $this->getRequestData('features'), // Should be array
                'sort_order' => $this->getInt('sort_order', 0),
            ];

            $serviceId = $this->serviceModel->createService($serviceData);

            $service = $this->serviceModel->find($serviceId);

            Response::success($service, 'Service created successfully', 201);

        } catch (ValidationException $e) {
            Response::error($e->getMessage(), null, 400);
        } catch (\Exception $e) {
            error_log("Create Service Error: " . $e->getMessage());
            Response::error('An error occurred', null, 500);
        }
    }

    /**
     * Update service (admin)
     * PUT /api/services/:id
     */
    public function update(): void {
        $this->requireMethod('PUT');
        $this->requireAdmin();

        try {
            $serviceId = $this->getInt('id');

            if (!$serviceId) {
                Response::error('Service ID is required', null, 400);
            }

            $service = $this->serviceModel->find($serviceId);
            if (!$service) {
                Response::notFound('Service not found');
            }

            $updateData = [];

            if ($this->getRequestData('title')) {
                $updateData['title'] = $this->getString('title');
            }

            if ($this->getRequestData('category')) {
                $updateData['category'] = $this->getString('category');
            }

            if ($this->getRequestData('description')) {
                $updateData['description'] = $this->getString('description');
            }

            if ($this->getRequestData('short_description')) {
                $updateData['short_description'] = $this->getString('short_description');
            }

            if ($this->getRequestData('icon')) {
                $updateData['icon'] = $this->getString('icon');
            }

            if ($this->getRequestData('features')) {
                $updateData['features'] = $this->getRequestData('features');
            }

            if ($this->getRequestData('sort_order') !== null) {
                $updateData['sort_order'] = $this->getInt('sort_order');
            }

            if (empty($updateData)) {
                throw new ValidationException('No data provided for update');
            }

            $this->serviceModel->updateService($serviceId, $updateData);

            $updatedService = $this->serviceModel->find($serviceId);

            Response::success($updatedService, 'Service updated successfully');

        } catch (ValidationException $e) {
            Response::error($e->getMessage(), null, 400);
        } catch (\Exception $e) {
            error_log("Update Service Error: " . $e->getMessage());
            Response::error('An error occurred', null, 500);
        }
    }

    /**
     * Toggle service active status (admin)
     * PUT /api/services/:id/toggle
     */
    public function toggleActive(): void {
        $this->requireMethod('PUT');
        $this->requireAdmin();

        try {
            $serviceId = $this->getInt('id');

            if (!$serviceId) {
                Response::error('Service ID is required', null, 400);
            }

            $success = $this->serviceModel->toggleActive($serviceId);

            if (!$success) {
                Response::error('Failed to toggle service status', null, 500);
            }

            Response::success(null, 'Service status updated successfully');

        } catch (\Exception $e) {
            error_log("Toggle Service Error: " . $e->getMessage());
            Response::error('An error occurred', null, 500);
        }
    }

    /**
     * Delete service (admin)
     * DELETE /api/services/:id
     */
    public function delete(): void {
        $this->requireMethod('DELETE');
        $this->requireAdmin();

        try {
            $serviceId = $this->getInt('id');

            if (!$serviceId) {
                Response::error('Service ID is required', null, 400);
            }

            $success = $this->serviceModel->delete($serviceId);

            if (!$success) {
                Response::error('Failed to delete service', null, 500);
            }

            Response::success(null, 'Service deleted successfully');

        } catch (\Exception $e) {
            error_log("Delete Service Error: " . $e->getMessage());
            Response::error('An error occurred', null, 500);
        }
    }

    /**
     * Search services
     * GET /api/services/search
     */
    public function search(): void {
        $this->requireMethod('GET');

        try {
            $query = $this->getString('q');

            if (empty($query)) {
                Response::error('Search query is required', null, 400);
            }

            $pagination = $this->getPaginationParams();
            $services = $this->serviceModel->search(
                $query,
                $pagination['per_page'],
                ($pagination['page'] - 1) * $pagination['per_page']
            );

            Response::success([
                'services' => $services,
                'query' => $query
            ]);

        } catch (\Exception $e) {
            error_log("Search Services Error: " . $e->getMessage());
            Response::error('An error occurred', null, 500);
        }
    }
}
