<?php
declare(strict_types=1);

namespace App\Helpers;

/**
 * Pagination Helper
 */
class Pagination {
    /**
     * Calculate pagination parameters
     */
    public static function calculate(int $page = 1, int $perPage = DEFAULT_PAGE_SIZE): array {
        $page = max(1, $page);
        $perPage = min(max(1, $perPage), MAX_PAGE_SIZE);
        $offset = ($page - 1) * $perPage;

        return [
            'page' => $page,
            'per_page' => $perPage,
            'offset' => $offset,
            'limit' => $perPage
        ];
    }

    /**
     * Build pagination response
     */
    public static function buildResponse(
        array $data,
        int $total,
        int $page,
        int $perPage
    ): array {
        $totalPages = ceil($total / $perPage);

        return [
            'data' => $data,
            'pagination' => [
                'current_page' => $page,
                'per_page' => $perPage,
                'total' => $total,
                'total_pages' => $totalPages,
                'has_more' => $page < $totalPages
            ]
        ];
    }
}
