<?php
declare(strict_types=1);

use App\Controllers\AnalyticsController;
use App\Middleware\AuthMiddleware;
use App\Middleware\AdminMiddleware;

/**
 * Analytics Routes
 * All routes require admin authentication
 */

return function($router) {
    $prefix = '/analytics';

    // Get dashboard overview
    $router->get($prefix . '/dashboard', function() {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::handle($tokenData);
        $controller = new AnalyticsController();
        $controller->setUser($tokenData);
        $controller->getDashboard();
    });

    // Get revenue analytics
    $router->get($prefix . '/revenue', function() {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::handle($tokenData);
        $controller = new AnalyticsController();
        $controller->setUser($tokenData);
        $controller->getRevenue();
    });

    // Get quote trends
    $router->get($prefix . '/quote-trends', function() {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::handle($tokenData);
        $controller = new AnalyticsController();
        $controller->setUser($tokenData);
        $controller->getQuoteTrends();
    });

    // Get client activity
    $router->get($prefix . '/client-activity', function() {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::handle($tokenData);
        $controller = new AnalyticsController();
        $controller->setUser($tokenData);
        $controller->getClientActivity();
    });

    // Get service performance
    $router->get($prefix . '/service-performance', function() {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::handle($tokenData);
        $controller = new AnalyticsController();
        $controller->setUser($tokenData);
        $controller->getServicePerformance();
    });

    // Get recent activity feed
    $router->get($prefix . '/recent-activity', function() {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::handle($tokenData);
        $controller = new AnalyticsController();
        $controller->setUser($tokenData);
        $controller->getRecentActivity();
    });

    // Export analytics data
    $router->get($prefix . '/export', function() {
        $tokenData = AuthMiddleware::handle();
        AdminMiddleware::handle($tokenData);
        $controller = new AnalyticsController();
        $controller->setUser($tokenData);
        $controller->exportData();
    });
};
