<?php
declare(strict_types=1);

namespace App\Helpers;

use DateTime;

/**
 * Date Helper
 */
class DateHelper {
    /**
     * Format date for display
     */
    public static function format(string $date, string $format = 'Y-m-d H:i:s'): string {
        $dateTime = new DateTime($date);
        return $dateTime->format($format);
    }

    /**
     * Get human-readable time difference
     */
    public static function timeAgo(string $date): string {
        $timestamp = strtotime($date);
        $diff = time() - $timestamp;

        if ($diff < 60) {
            return 'just now';
        } elseif ($diff < 3600) {
            $mins = floor($diff / 60);
            return $mins . ' minute' . ($mins > 1 ? 's' : '') . ' ago';
        } elseif ($diff < 86400) {
            $hours = floor($diff / 3600);
            return $hours . ' hour' . ($hours > 1 ? 's' : '') . ' ago';
        } elseif ($diff < 604800) {
            $days = floor($diff / 86400);
            return $days . ' day' . ($days > 1 ? 's' : '') . ' ago';
        } else {
            return self::format($date, 'd M Y');
        }
    }

    /**
     * Add days to date
     */
    public static function addDays(string $date, int $days): string {
        $dateTime = new DateTime($date);
        $dateTime->modify("+$days days");
        return $dateTime->format('Y-m-d');
    }
}
