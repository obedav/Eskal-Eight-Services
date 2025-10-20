<?php
declare(strict_types=1);

namespace App\Middleware;

use App\Helpers\Response;

/**
 * Rate Limiting Middleware
 */
class RateLimitMiddleware {
    private static int $maxRequests = 60; // Max requests per minute
    private static string $cacheDir;

    /**
     * Initialize cache directory
     */
    private static function init(): void {
        self::$cacheDir = dirname(__DIR__, 2) . '/storage/cache/ratelimit/';
        if (!is_dir(self::$cacheDir)) {
            mkdir(self::$cacheDir, 0755, true);
        }
    }

    /**
     * Handle rate limiting
     */
    public static function handle(string $identifier = null): void {
        self::init();

        // Use IP address if no identifier provided
        if ($identifier === null) {
            $identifier = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        }

        $key = md5($identifier);
        $cacheFile = self::$cacheDir . $key . '.txt';
        $now = time();

        // Clean old cache files (older than 1 minute)
        self::cleanCache();

        if (file_exists($cacheFile)) {
            $data = json_decode(file_get_contents($cacheFile), true);
            $requests = $data['requests'] ?? 0;
            $timestamp = $data['timestamp'] ?? 0;

            // Reset if more than 1 minute has passed
            if ($now - $timestamp > 60) {
                $requests = 0;
                $timestamp = $now;
            }

            if ($requests >= self::$maxRequests) {
                Response::error('Too many requests. Please try again later.', null, 429);
            }

            $requests++;
        } else {
            $requests = 1;
            $timestamp = $now;
        }

        // Save updated count
        file_put_contents($cacheFile, json_encode([
            'requests' => $requests,
            'timestamp' => $timestamp
        ]));
    }

    /**
     * Clean old cache files
     */
    private static function cleanCache(): void {
        $files = glob(self::$cacheDir . '*.txt');
        $now = time();

        foreach ($files as $file) {
            if ($now - filemtime($file) > 60) {
                @unlink($file);
            }
        }
    }
}
