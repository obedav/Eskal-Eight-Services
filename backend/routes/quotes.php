<?php
declare(strict_types=1);

use App\Controllers\QuoteController;
use App\Middleware\AuthMiddleware;
use App\Middleware\AdminMiddleware;

/**
 * Quote Routes
 */

return function($router) {
    $prefix = '/quotes';

    // Protected routes (authentication required)
    // Create quote
    $router->post($prefix, function() {
        $tokenData = AuthMiddleware::handle();
        $controller = new QuoteController();
        $controller->setUser($tokenData);
        $controller->create();
    });

    // Get user's quotes
    $router->get($prefix . '/my', function() {
        $tokenData = AuthMiddleware::handle();
        $controller = new QuoteController();
        $controller->setUser($tokenData);
        $controller->getMyQuotes();
    });

    // Get single quote
    $router->get($prefix . '/:id', function($id) {
        $tokenData = AuthMiddleware::handle();
        $controller = new QuoteController();
        $controller->setUser($tokenData);
        $_REQUEST['id'] = $id;
        $controller->getOne();
    });

    // Search quotes
    $router->get($prefix . '/search', function() {
        $tokenData = AuthMiddleware::handle();
        $controller = new QuoteController();
        $controller->setUser($tokenData);
        $controller->search();
    });

    // Admin routes
    // Get all quotes
    $router->get($prefix, function() {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::verify($tokenData);
        $controller = new QuoteController();
        $controller->setUser($tokenData);
        $controller->getAll();
    });

    // Get quote statistics
    $router->get($prefix . '/statistics', function() {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::verify($tokenData);
        $controller = new QuoteController();
        $controller->setUser($tokenData);
        $controller->getStatistics();
    });

    // Update quote status
    $router->put($prefix . '/:id/status', function($id) {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::verify($tokenData);
        $controller = new QuoteController();
        $controller->setUser($tokenData);
        $_REQUEST['id'] = $id;
        $controller->updateStatus();
    });

    // Set quote amount
    $router->put($prefix . '/:id/amount', function($id) {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::verify($tokenData);
        $controller = new QuoteController();
        $controller->setUser($tokenData);
        $_REQUEST['id'] = $id;
        $controller->setAmount();
    });
};
