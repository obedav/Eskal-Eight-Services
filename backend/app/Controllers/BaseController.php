<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Helpers\Response;
use App\Helpers\Sanitizer;

/**
 * Base Controller Class
 * All controllers should extend this class
 */
abstract class BaseController {
    protected array $requestData = [];
    protected string $method;
    protected ?object $user = null;

    public function __construct() {
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->parseRequestData();
    }

    /**
     * Parse incoming request data
     */
    protected function parseRequestData(): void {
        $contentType = $_SERVER['CONTENT_TYPE'] ?? '';

        if ($this->method === 'GET') {
            $this->requestData = $_GET;
        } elseif (str_contains($contentType, 'application/json')) {
            $input = file_get_contents('php://input');
            $this->requestData = json_decode($input, true) ?? [];
        } else {
            $this->requestData = array_merge($_POST, $_GET);
        }
    }

    /**
     * Get request data
     */
    protected function getRequestData(string $key = null, mixed $default = null): mixed {
        if ($key === null) {
            return $this->requestData;
        }

        return $this->requestData[$key] ?? $default;
    }

    /**
     * Get sanitized string from request
     */
    protected function getString(string $key, string $default = ''): string {
        return Sanitizer::string($this->getRequestData($key, $default));
    }

    /**
     * Get sanitized integer from request
     */
    protected function getInt(string $key, int $default = 0): int {
        return Sanitizer::int($this->getRequestData($key, $default));
    }

    /**
     * Get sanitized float from request
     */
    protected function getFloat(string $key, float $default = 0.0): float {
        return Sanitizer::float($this->getRequestData($key, $default));
    }

    /**
     * Get sanitized email from request
     */
    protected function getEmail(string $key, string $default = ''): string {
        return Sanitizer::email($this->getRequestData($key, $default));
    }

    /**
     * Check if request method matches
     */
    protected function isMethod(string $method): bool {
        return $this->method === strtoupper($method);
    }

    /**
     * Require specific request method
     */
    protected function requireMethod(string $method): void {
        if (!$this->isMethod($method)) {
            Response::error('Method not allowed', null, 405);
        }
    }

    /**
     * Set authenticated user
     */
    public function setUser(?object $user): void {
        $this->user = $user;
    }

    /**
     * Get authenticated user
     */
    protected function getUser(): ?object {
        return $this->user;
    }

    /**
     * Require authentication
     */
    protected function requireAuth(): void {
        if ($this->user === null) {
            Response::unauthorized();
        }
    }

    /**
     * Require admin role
     */
    protected function requireAdmin(): void {
        $this->requireAuth();

        if (!in_array($this->user->role, [ROLE_ADMIN, ROLE_SUPER_ADMIN])) {
            Response::forbidden('Admin access required');
        }
    }

    /**
     * Get pagination parameters
     */
    protected function getPaginationParams(): array {
        return [
            'page' => max(1, $this->getInt('page', 1)),
            'per_page' => min(max(1, $this->getInt('per_page', DEFAULT_PAGE_SIZE)), MAX_PAGE_SIZE)
        ];
    }

    /**
     * Get uploaded file
     */
    protected function getFile(string $key): ?array {
        return $_FILES[$key] ?? null;
    }

    /**
     * Get multiple uploaded files
     */
    protected function getFiles(string $key): ?array {
        if (!isset($_FILES[$key])) {
            return null;
        }

        $files = $_FILES[$key];

        // Check if it's multiple files
        if (is_array($files['name'])) {
            return $files;
        }

        return null;
    }
}
