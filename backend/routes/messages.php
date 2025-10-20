<?php
declare(strict_types=1);

use App\Controllers\MessageController;
use App\Middleware\AuthMiddleware;
use App\Middleware\AdminMiddleware;

/**
 * Message Routes
 */

return function($router) {
    $prefix = '/messages';

    // Get inbox messages
    $router->get($prefix . '/inbox', function() {
        $tokenData = AuthMiddleware::handle();
        $controller = new MessageController();
        $controller->setUser($tokenData);
        $controller->getInbox();
    });

    // Get sent messages
    $router->get($prefix . '/sent', function() {
        $tokenData = AuthMiddleware::handle();
        $controller = new MessageController();
        $controller->setUser($tokenData);
        $controller->getSent();
    });

    // Get unread count
    $router->get($prefix . '/unread-count', function() {
        $tokenData = AuthMiddleware::handle();
        $controller = new MessageController();
        $controller->setUser($tokenData);
        $controller->getUnreadCount();
    });

    // Get admin unread count (from all clients)
    $router->get($prefix . '/admin/unread-count', function() {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::handle($tokenData);
        $controller = new MessageController();
        $controller->setUser($tokenData);
        $controller->getAdminUnreadCount();
    });

    // Mark all messages as read
    $router->put($prefix . '/mark-all-read', function() {
        $tokenData = AuthMiddleware::handle();
        $controller = new MessageController();
        $controller->setUser($tokenData);
        $controller->markAllAsRead();
    });

    // Send a new message
    $router->post($prefix, function() {
        $tokenData = AuthMiddleware::handle();
        $controller = new MessageController();
        $controller->setUser($tokenData);
        $controller->create();
    });

    // Get a specific message by ID
    $router->get($prefix . '/{id}', function($id) {
        $tokenData = AuthMiddleware::handle();
        $controller = new MessageController();
        $controller->setUser($tokenData);
        $controller->getById((int)$id);
    });

    // Mark specific message as read
    $router->put($prefix . '/{id}/mark-read', function($id) {
        $tokenData = AuthMiddleware::handle();
        $controller = new MessageController();
        $controller->setUser($tokenData);
        $controller->markAsRead((int)$id);
    });

    // Delete a message
    $router->delete($prefix . '/{id}', function($id) {
        $tokenData = AuthMiddleware::handle();
        $controller = new MessageController();
        $controller->setUser($tokenData);
        $controller->delete((int)$id);
    });
};
