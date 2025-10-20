<?php
declare(strict_types=1);

namespace App\Helpers;

/**
 * API Response Helper
 */
class Response {
    /**
     * Send success response
     */
    public static function success(
        mixed $data = null,
        string $message = MSG_SUCCESS,
        int $statusCode = 200
    ): void {
        http_response_code($statusCode);
        echo json_encode([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    /**
     * Send error response
     */
    public static function error(
        string $message = MSG_ERROR,
        mixed $errors = null,
        int $statusCode = 400
    ): void {
        http_response_code($statusCode);
        echo json_encode([
            'success' => false,
            'message' => $message,
            'errors' => $errors
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    /**
     * Send validation error response
     */
    public static function validationError(
        array $errors,
        string $message = MSG_VALIDATION_ERROR
    ): void {
        self::error($message, $errors, 422);
    }

    /**
     * Send unauthorized response
     */
    public static function unauthorized(string $message = MSG_UNAUTHORIZED): void {
        self::error($message, null, 401);
    }

    /**
     * Send forbidden response
     */
    public static function forbidden(string $message = MSG_FORBIDDEN): void {
        self::error($message, null, 403);
    }

    /**
     * Send not found response
     */
    public static function notFound(string $message = MSG_NOT_FOUND): void {
        self::error($message, null, 404);
    }

    /**
     * Send server error response
     */
    public static function serverError(string $message = MSG_SERVER_ERROR): void {
        self::error($message, null, 500);
    }
}
