<?php
declare(strict_types=1);

namespace App\Helpers;

use Firebase\JWT\JWT as FirebaseJWT;
use Firebase\JWT\Key;
use Exception;

/**
 * JWT Token Helper
 */
class JWT {
    /**
     * Generate JWT token
     */
    public static function generate(array $payload): string {
        $issuedAt = time();
        $expiresAt = $issuedAt + JWT_EXPIRY;

        $token = [
            'iat' => $issuedAt,
            'exp' => $expiresAt,
            'data' => $payload
        ];

        return FirebaseJWT::encode($token, JWT_SECRET, JWT_ALGORITHM);
    }

    /**
     * Decode and validate JWT token
     */
    public static function decode(string $token): ?object {
        try {
            $decoded = FirebaseJWT::decode($token, new Key(JWT_SECRET, JWT_ALGORITHM));
            return $decoded->data;
        } catch (Exception $e) {
            error_log("JWT Decode Error: " . $e->getMessage());
            return null;
        }
    }

    /**
     * Get token from Authorization header
     */
    public static function getTokenFromHeader(): ?string {
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';

        // Debug logging
        if (empty($authHeader)) {
            error_log("JWT Auth Header Missing. Available headers: " . json_encode(array_keys($headers)));
        }

        if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
            return $matches[1];
        }

        return null;
    }

    /**
     * Verify token and return decoded data
     */
    public static function verify(): ?object {
        $token = self::getTokenFromHeader();

        if (!$token) {
            return null;
        }

        return self::decode($token);
    }
}
