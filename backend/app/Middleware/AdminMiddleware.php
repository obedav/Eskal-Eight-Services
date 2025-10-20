<?php
declare(strict_types=1);

namespace App\Middleware;

use App\Helpers\Response;

/**
 * Admin Access Middleware
 */
class AdminMiddleware {
    /**
     * Check if user is admin
     */
    public static function handle(object $user): void {
        if (!in_array($user->role, [ROLE_ADMIN, ROLE_SUPER_ADMIN])) {
            Response::forbidden('Admin access required');
        }
    }

    /**
     * Verify admin access (alias for handle)
     */
    public static function verify(object $user): void {
        self::handle($user);
    }
}
