<?php
declare(strict_types=1);

use App\Controllers\ProjectController;
use App\Middleware\AuthMiddleware;
use App\Middleware\AdminMiddleware;

/**
 * Project Management Routes
 */

return function($router) {
    $prefix = '/projects';

    // Get user's projects (authenticated users)
    $router->get($prefix . '/my', function() {
        $tokenData = AuthMiddleware::handle();
        $controller = new ProjectController();
        $controller->setUser($tokenData);
        $controller->getMyProjects();
    });

    // Get all projects with filtering and pagination (admin only)
    $router->get($prefix, function() {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::handle($tokenData);
        $controller = new ProjectController();
        $controller->setUser($tokenData);
        $controller->getAll();
    });

    // Get project statistics (admin only)
    $router->get($prefix . '/statistics', function() {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::handle($tokenData);
        $controller = new ProjectController();
        $controller->setUser($tokenData);
        $controller->getStatistics();
    });

    // Get single project
    $router->get($prefix . '/:id', function() {
        $tokenData = AuthMiddleware::handle();
        $controller = new ProjectController();
        $controller->setUser($tokenData);
        $controller->getOne();
    });

    // Create new project (admin only)
    $router->post($prefix, function() {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::handle($tokenData);
        $controller = new ProjectController();
        $controller->setUser($tokenData);
        $controller->create();
    });

    // Update project (admin only)
    $router->put($prefix . '/:id', function() {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::handle($tokenData);
        $controller = new ProjectController();
        $controller->setUser($tokenData);
        $controller->update();
    });

    // Update project status (admin only)
    $router->put($prefix . '/:id/status', function() {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::handle($tokenData);
        $controller = new ProjectController();
        $controller->setUser($tokenData);
        $controller->updateStatus();
    });

    // Delete project (admin only)
    $router->delete($prefix . '/:id', function() {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::handle($tokenData);
        $controller = new ProjectController();
        $controller->setUser($tokenData);
        $controller->delete();
    });
};
