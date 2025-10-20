<?php
declare(strict_types=1);

namespace App\Middleware;

use App\Helpers\JWT;
use App\Helpers\Response;

/**
 * Authentication Middleware
 */
class AuthMiddleware {
    /**
     * Handle authentication
     */
    public static function handle(): ?object {
        $tokenData = JWT::verify();

        if (!$tokenData) {
            Response::unauthorized('Invalid or expired token');
        }

        return $tokenData;
    }

    /**
     * Optional authentication (doesn't fail if no token)
     */
    public static function optional(): ?object {
        return JWT::verify();
    }
}
