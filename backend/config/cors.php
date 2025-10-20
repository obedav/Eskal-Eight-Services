<?php
declare(strict_types=1);

/**
 * CORS Configuration
 */

class CORS {
    /**
     * Set CORS headers
     */
    public static function setHeaders(): void {
        $allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:3001',
            $_ENV['FRONTEND_URL'] ?? 'https://eskaleight.com'
        ];

        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

        if (in_array($origin, $allowedOrigins)) {
            header("Access-Control-Allow-Origin: $origin");
        }

        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
        header('Access-Control-Max-Age: 86400');

        // Handle preflight requests
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit;
        }
    }
}
