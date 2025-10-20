<?php
declare(strict_types=1);

use App\Controllers\AuthController;
use App\Middleware\AuthMiddleware;

/**
 * Authentication Routes
 */

return function($router) {
    $prefix = '/auth';

    // Public routes (no authentication required)
    $router->post($prefix . '/login', function() {
        $controller = new AuthController();
        $controller->login();
    });

    $router->post($prefix . '/register', function() {
        $controller = new AuthController();
        $controller->register();
    });

    $router->post($prefix . '/forgot-password', function() {
        $controller = new AuthController();
        $controller->forgotPassword();
    });

    $router->post($prefix . '/reset-password', function() {
        $controller = new AuthController();
        $controller->resetPassword();
    });

    // Protected routes (authentication required)
    $router->get($prefix . '/verify', function() {
        $controller = new AuthController();
        $controller->verify();
    });

    $router->get($prefix . '/me', function() {
        $tokenData = AuthMiddleware::handle();
        $controller = new AuthController();
        $controller->setUser($tokenData);
        $controller->getProfile();
    });

    $router->put($prefix . '/profile', function() {
        $tokenData = AuthMiddleware::handle();
        $controller = new AuthController();
        $controller->setUser($tokenData);
        $controller->updateProfile();
    });

    $router->post($prefix . '/change-password', function() {
        $tokenData = AuthMiddleware::handle();
        $controller = new AuthController();
        $controller->setUser($tokenData);
        $controller->changePassword();
    });
};
