<?php
declare(strict_types=1);

/**
 * Payment Routes
 */

use App\Controllers\PaymentController;
use App\Middleware\AuthMiddleware;
use App\Middleware\AdminMiddleware;

return function($router) {
    // Payment initialization and verification (Authenticated users)
    $router->post('/payments/initialize', function() {
        AuthMiddleware::handle();
        $controller = new PaymentController();
        $controller->initializePayment();
    });

    $router->post('/payments/verify', function() {
        AuthMiddleware::handle();
        $controller = new PaymentController();
        $controller->verifyPayment();
    });

    // Get payment by ID (Authenticated users)
    $router->get('/payments/{id}', function($params) {
        AuthMiddleware::handle();
        $_REQUEST['id'] = $params['id'];
        $controller = new PaymentController();
        $controller->getPayment();
    });

    // Get payment history (Authenticated users)
    $router->get('/payments', function() {
        AuthMiddleware::handle();
        $controller = new PaymentController();
        $controller->getPaymentHistory();
    });

    // Get payment statistics (Admin only)
    $router->get('/payments/statistics/all', function() {
        AuthMiddleware::handle();
        AdminMiddleware::verify($_REQUEST['user']);
        $controller = new PaymentController();
        $controller->getPaymentStatistics();
    });

    // Webhook endpoints (No authentication - verified by signature)
    $router->post('/webhooks/paystack', function() {
        $controller = new PaymentController();
        $controller->handlePaystackWebhook();
    });

    $router->post('/webhooks/flutterwave', function() {
        $controller = new PaymentController();
        $controller->handleFlutterwaveWebhook();
    });

    // Payment callback URLs (for redirects from payment gateways)
    $router->get('/payments/callback/paystack', function() {
        // This will redirect to frontend with payment reference
        $reference = $_GET['reference'] ?? '';
        $frontendUrl = $_ENV['FRONTEND_URL'] ?? 'http://localhost:3000';
        header("Location: {$frontendUrl}/payment/callback?reference={$reference}&gateway=paystack");
        exit;
    });

    $router->get('/payments/callback/flutterwave', function() {
        // This will redirect to frontend with payment reference
        $reference = $_GET['tx_ref'] ?? '';
        $status = $_GET['status'] ?? '';
        $frontendUrl = $_ENV['FRONTEND_URL'] ?? 'http://localhost:3000';
        header("Location: {$frontendUrl}/payment/callback?reference={$reference}&status={$status}&gateway=flutterwave");
        exit;
    });
};
