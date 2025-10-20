<?php
declare(strict_types=1);

use App\Controllers\UserController;
use App\Middleware\AuthMiddleware;
use App\Middleware\AdminMiddleware;

/**
 * User/Client Management Routes
 * All routes require admin authentication
 */

return function($router) {
    $prefix = '/users';

    // Get all users with filtering and pagination
    $router->get($prefix, function() {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::handle($tokenData);
        $controller = new UserController();
        $controller->setUser($tokenData);
        $controller->getAll();
    });

    // Get user statistics
    $router->get($prefix . '/statistics', function() {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::handle($tokenData);
        $controller = new UserController();
        $controller->setUser($tokenData);
        $controller->getStatistics();
    });

    // Get single user
    $router->get($prefix . '/:id', function() {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::handle($tokenData);
        $controller = new UserController();
        $controller->setUser($tokenData);
        $controller->getOne();
    });

    // Update user status
    $router->put($prefix . '/:id/status', function() {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::handle($tokenData);
        $controller = new UserController();
        $controller->setUser($tokenData);
        $controller->updateStatus();
    });

    // Delete user
    $router->delete($prefix . '/:id', function() {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::handle($tokenData);
        $controller = new UserController();
        $controller->setUser($tokenData);
        $controller->delete();
    });
};
