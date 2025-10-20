<?php
declare(strict_types=1);

namespace App\Models;

/**
 * Service Model
 */
class Service extends BaseModel {
    protected string $table = 'services';

    /**
     * Get all active services
     */
    public function getActiveServices(int $limit = 100, int $offset = 0): array {
        $stmt = $this->db->prepare(
            "SELECT * FROM {$this->table}
             WHERE is_active = 1
             ORDER BY sort_order ASC, title ASC
             LIMIT ? OFFSET ?"
        );
        $stmt->execute([$limit, $offset]);

        $services = $stmt->fetchAll();

        // Decode JSON features
        foreach ($services as &$service) {
            $service['features'] = json_decode($service['features'], true);
        }

        return $services;
    }

    /**
     * Get services by category
     */
    public function getByCategory(string $category, int $limit = 100, int $offset = 0): array {
        $stmt = $this->db->prepare(
            "SELECT * FROM {$this->table}
             WHERE category = ? AND is_active = 1
             ORDER BY sort_order ASC
             LIMIT ? OFFSET ?"
        );
        $stmt->execute([$category, $limit, $offset]);

        $services = $stmt->fetchAll();

        // Decode JSON features
        foreach ($services as &$service) {
            $service['features'] = json_decode($service['features'], true);
        }

        return $services;
    }

    /**
     * Find service by slug
     */
    public function findBySlug(string $slug): ?array {
        $stmt = $this->db->prepare("SELECT * FROM {$this->table} WHERE slug = ? LIMIT 1");
        $stmt->execute([$slug]);
        $result = $stmt->fetch();

        if ($result) {
            $result['features'] = json_decode($result['features'], true);
        }

        return $result ?: null;
    }

    /**
     * Get all categories
     */
    public function getCategories(): array {
        $stmt = $this->db->query(
            "SELECT DISTINCT category
             FROM {$this->table}
             WHERE is_active = 1
             ORDER BY category"
        );
        return $stmt->fetchAll(\PDO::FETCH_COLUMN);
    }

    /**
     * Create service
     */
    public function createService(array $data): int {
        // Encode features if array
        if (isset($data['features']) && is_array($data['features'])) {
            $data['features'] = json_encode($data['features']);
        }

        // Generate slug if not provided
        if (!isset($data['slug']) && isset($data['title'])) {
            $data['slug'] = $this->generateSlug($data['title']);
        }

        return $this->create($data);
    }

    /**
     * Update service
     */
    public function updateService(int $id, array $data): bool {
        // Encode features if array
        if (isset($data['features']) && is_array($data['features'])) {
            $data['features'] = json_encode($data['features']);
        }

        return $this->update($id, $data);
    }

    /**
     * Toggle service active status
     */
    public function toggleActive(int $id): bool {
        $stmt = $this->db->prepare(
            "UPDATE {$this->table}
             SET is_active = NOT is_active
             WHERE id = ?"
        );
        return $stmt->execute([$id]);
    }

    /**
     * Generate slug from title
     */
    private function generateSlug(string $title): string {
        $slug = strtolower(trim($title));
        $slug = preg_replace('/[^a-z0-9-]/', '-', $slug);
        $slug = preg_replace('/-+/', '-', $slug);
        return trim($slug, '-');
    }

    /**
     * Search services
     */
    public function search(string $query, int $limit = 20, int $offset = 0): array {
        $searchTerm = "%{$query}%";

        $stmt = $this->db->prepare(
            "SELECT * FROM {$this->table}
             WHERE (title LIKE ? OR description LIKE ? OR short_description LIKE ?)
             AND is_active = 1
             ORDER BY sort_order ASC
             LIMIT ? OFFSET ?"
        );

        $stmt->execute([$searchTerm, $searchTerm, $searchTerm, $limit, $offset]);

        $services = $stmt->fetchAll();

        // Decode JSON features
        foreach ($services as &$service) {
            $service['features'] = json_decode($service['features'], true);
        }

        return $services;
    }

    /**
     * Update sort order
     */
    public function updateSortOrder(int $id, int $sortOrder): bool {
        return $this->update($id, ['sort_order' => $sortOrder]);
    }
}
