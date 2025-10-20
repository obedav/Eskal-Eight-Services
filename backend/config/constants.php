<?php
declare(strict_types=1);

/**
 * Application Constants
 */

// Application Info
define('APP_NAME', 'ESKAL EIGHT SERVICES');
define('APP_VERSION', '1.0.0');
define('APP_URL', $_ENV['APP_URL'] ?? 'http://localhost');

// File Upload Settings
define('MAX_FILE_SIZE', 10 * 1024 * 1024); // 10MB
define('ALLOWED_IMAGE_TYPES', ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']);
define('ALLOWED_DOCUMENT_TYPES', ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']);

// Upload Paths
define('UPLOAD_PATH', dirname(__DIR__) . '/storage/uploads/');
define('DOCUMENT_PATH', UPLOAD_PATH . 'documents/');
define('IMAGE_PATH', UPLOAD_PATH . 'images/');
define('PROFILE_PATH', UPLOAD_PATH . 'profiles/');
define('TEMP_PATH', UPLOAD_PATH . 'temp/');

// Log Paths
define('LOG_PATH', dirname(__DIR__) . '/storage/logs/');
define('ERROR_LOG', LOG_PATH . 'error.log');
define('API_LOG', LOG_PATH . 'api.log');
define('PAYMENT_LOG', LOG_PATH . 'payment.log');

// JWT Settings
define('JWT_SECRET', $_ENV['JWT_SECRET'] ?? 'your-secret-key-change-this');
define('JWT_EXPIRY', (int)($_ENV['JWT_EXPIRY'] ?? 3600)); // 1 hour
define('JWT_ALGORITHM', 'HS256');

// Pagination
define('DEFAULT_PAGE_SIZE', 20);
define('MAX_PAGE_SIZE', 100);

// Quote Settings
define('QUOTE_VALIDITY_DAYS', 30);
define('QUOTE_PREFIX', 'QT');

// Project Settings
define('PROJECT_PREFIX', 'PR');

// Payment Settings
define('PAYMENT_PREFIX', 'PAY');
define('CURRENCY', 'NGN');

// Status Constants
define('STATUS_ACTIVE', 'active');
define('STATUS_INACTIVE', 'inactive');
define('STATUS_PENDING', 'pending');
define('STATUS_APPROVED', 'approved');
define('STATUS_REJECTED', 'rejected');

// User Roles
define('ROLE_CLIENT', 'client');
define('ROLE_ADMIN', 'admin');
define('ROLE_SUPER_ADMIN', 'super_admin');

// Response Messages
define('MSG_SUCCESS', 'Operation successful');
define('MSG_ERROR', 'An error occurred');
define('MSG_UNAUTHORIZED', 'Unauthorized access');
define('MSG_FORBIDDEN', 'Access forbidden');
define('MSG_NOT_FOUND', 'Resource not found');
define('MSG_VALIDATION_ERROR', 'Validation failed');
define('MSG_SERVER_ERROR', 'Internal server error');
