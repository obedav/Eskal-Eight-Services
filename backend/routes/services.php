<?php
declare(strict_types=1);

use App\Controllers\ServiceController;
use App\Middleware\AuthMiddleware;
use App\Middleware\AdminMiddleware;

/**
 * Service Routes
 */

return function($router) {
    $prefix = '/services';

    // Public routes
    // Get all services
    $router->get($prefix, function() {
        $controller = new ServiceController();
        $controller->getAll();
    });

    // Get categories
    $router->get($prefix . '/categories', function() {
        $controller = new ServiceController();
        $controller->getCategories();
    });

    // Search services
    $router->get($prefix . '/search', function() {
        $controller = new ServiceController();
        $controller->search();
    });

    // Get single service
    $router->get($prefix . '/:id', function($id) {
        $controller = new ServiceController();
        $_REQUEST['id'] = $id;
        $controller->getOne();
    });

    // Admin routes
    // Create service
    $router->post($prefix, function() {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::verify($tokenData);
        $controller = new ServiceController();
        $controller->setUser($tokenData);
        $controller->create();
    });

    // Update service
    $router->put($prefix . '/:id', function($id) {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::verify($tokenData);
        $controller = new ServiceController();
        $controller->setUser($tokenData);
        $_REQUEST['id'] = $id;
        $controller->update();
    });

    // Toggle service active status
    $router->put($prefix . '/:id/toggle', function($id) {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::verify($tokenData);
        $controller = new ServiceController();
        $controller->setUser($tokenData);
        $_REQUEST['id'] = $id;
        $controller->toggleActive();
    });

    // Delete service
    $router->delete($prefix . '/:id', function($id) {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::verify($tokenData);
        $controller = new ServiceController();
        $controller->setUser($tokenData);
        $_REQUEST['id'] = $id;
        $controller->delete();
    });
};
