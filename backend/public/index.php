<?php
declare(strict_types=1);

/**
 * API Entry Point
 */

// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');

// Set timezone
date_default_timezone_set('Africa/Lagos');

// Start output buffering
ob_start();

// Autoload Composer dependencies
require_once __DIR__ . '/../vendor/autoload.php';

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->safeLoad();

// Load configurations
require_once __DIR__ . '/../config/constants.php';
require_once __DIR__ . '/../config/database.php';

// Apply CORS middleware
require_once __DIR__ . '/../config/cors.php';
CORS::setHeaders();

use App\Helpers\Router;
use App\Helpers\Response;

try {
    // Create router instance
    $router = new Router();

    // Load authentication routes
    $router->loadRoutes(__DIR__ . '/../routes/auth.php');

    // Load service routes
    $router->loadRoutes(__DIR__ . '/../routes/services.php');

    // Load quote routes
    $router->loadRoutes(__DIR__ . '/../routes/quotes.php');

    // Load payment routes
    $router->loadRoutes(__DIR__ . '/../routes/payments.php');

    // Load user/client routes
    $router->loadRoutes(__DIR__ . '/../routes/users.php');

    // Load project routes
    $router->loadRoutes(__DIR__ . '/../routes/projects.php');

    // Load analytics routes
    $router->loadRoutes(__DIR__ . '/../routes/analytics.php');

    // Load message routes
    $router->loadRoutes(__DIR__ . '/../routes/messages.php');

    // Health check endpoint
    $router->get('/', function() {
        Response::success([
            'app' => APP_NAME,
            'version' => APP_VERSION,
            'status' => 'running'
        ], 'API is running');
    });

    $router->get('/health', function() {
        Response::success([
            'status' => 'healthy',
            'timestamp' => date('Y-m-d H:i:s')
        ]);
    });

    // Dispatch the router
    $router->dispatch();

} catch (Exception $e) {
    error_log("Application Error: " . $e->getMessage());
    Response::error('Internal server error', null, 500);
} finally {
    ob_end_flush();
}
