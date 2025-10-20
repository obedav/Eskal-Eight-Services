<?php
declare(strict_types=1);

namespace App\Middleware;

/**
 * CORS Middleware
 */
class CorsMiddleware {
    /**
     * Handle CORS
     */
    public static function handle(): void {
        \CORS::setHeaders();
    }
}
