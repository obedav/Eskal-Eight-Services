<?php
/**
 * Password Verification Script
 * This script checks if a password matches the stored hash
 */

// The hash from update-admin-password.sql
$storedHash = '$2y$10$9jQ7d9fErVU9ZJ7sL5zuG.3of.Qrp3Klj21K5ZX/2ToWucXtfd6HC';

// The hash from initial seed data
$initialHash = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';

// Test passwords
$testPasswords = [
    'Admin@123',
    'admin123',
    'password',
    'admin@123',
    'newpassword'
];

echo "Testing Updated Hash (from update-admin-password.sql):\n";
echo "Hash: $storedHash\n\n";

foreach ($testPasswords as $password) {
    $result = password_verify($password, $storedHash);
    echo "Password: '$password' => " . ($result ? "✓ MATCH" : "✗ NO MATCH") . "\n";
}

echo "\n\n";
echo "Testing Initial Hash (from seed data):\n";
echo "Hash: $initialHash\n\n";

foreach ($testPasswords as $password) {
    $result = password_verify($password, $initialHash);
    echo "Password: '$password' => " . ($result ? "✓ MATCH" : "✗ NO MATCH") . "\n";
}

echo "\n\n";
echo "Generating new hash for 'Admin@123':\n";
$newHash = password_hash('Admin@123', PASSWORD_BCRYPT);
echo "Hash: $newHash\n";
echo "Verification: " . (password_verify('Admin@123', $newHash) ? "✓ WORKS" : "✗ FAILED") . "\n";
