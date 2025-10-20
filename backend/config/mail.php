<?php
declare(strict_types=1);

/**
 * Email Configuration
 */

return [
    'driver' => 'smtp',
    'host' => $_ENV['MAIL_HOST'] ?? 'smtp.gmail.com',
    'port' => (int)($_ENV['MAIL_PORT'] ?? 587),
    'username' => $_ENV['MAIL_USERNAME'] ?? '',
    'password' => $_ENV['MAIL_PASSWORD'] ?? '',
    'encryption' => $_ENV['MAIL_ENCRYPTION'] ?? 'tls',
    'from' => [
        'address' => $_ENV['MAIL_FROM_ADDRESS'] ?? 'noreply@eskaleight.com',
        'name' => $_ENV['MAIL_FROM_NAME'] ?? 'ESKAL EIGHT SERVICES'
    ]
];
