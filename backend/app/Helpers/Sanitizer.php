<?php
declare(strict_types=1);

namespace App\Helpers;

/**
 * Input Sanitization Helper
 */
class Sanitizer {
    /**
     * Sanitize string
     */
    public static function string(?string $value): string {
        if ($value === null) {
            return '';
        }
        return htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
    }

    /**
     * Sanitize email
     */
    public static function email(?string $value): string {
        if ($value === null) {
            return '';
        }
        return filter_var(trim($value), FILTER_SANITIZE_EMAIL) ?: '';
    }

    /**
     * Sanitize integer
     */
    public static function int(mixed $value): int {
        return (int) filter_var($value, FILTER_SANITIZE_NUMBER_INT);
    }

    /**
     * Sanitize float
     */
    public static function float(mixed $value): float {
        return (float) filter_var($value, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    }

    /**
     * Sanitize URL
     */
    public static function url(?string $value): string {
        if ($value === null) {
            return '';
        }
        return filter_var(trim($value), FILTER_SANITIZE_URL) ?: '';
    }

    /**
     * Sanitize phone number (remove non-numeric except +)
     */
    public static function phone(?string $value): string {
        if ($value === null) {
            return '';
        }
        return preg_replace('/[^0-9+]/', '', trim($value));
    }

    /**
     * Sanitize array of strings
     */
    public static function arrayOfStrings(array $values): array {
        return array_map([self::class, 'string'], $values);
    }

    /**
     * Clean HTML (allow safe tags)
     */
    public static function html(?string $value): string {
        if ($value === null) {
            return '';
        }

        $allowedTags = '<p><br><strong><em><u><h1><h2><h3><ul><ol><li><a>';
        return strip_tags(trim($value), $allowedTags);
    }

    /**
     * Sanitize slug
     */
    public static function slug(?string $value): string {
        if ($value === null) {
            return '';
        }

        $value = strtolower(trim($value));
        $value = preg_replace('/[^a-z0-9-]/', '-', $value);
        $value = preg_replace('/-+/', '-', $value);
        return trim($value, '-');
    }
}
