<?php
declare(strict_types=1);

namespace App\Helpers;

/**
 * Simple Router Class
 */
class Router {
    private array $routes = [];
    private string $requestMethod;
    private string $requestUri;

    public function __construct() {
        $this->requestMethod = $_SERVER['REQUEST_METHOD'];
        $this->requestUri = $this->parseUri();
    }

    /**
     * Parse and clean request URI
     */
    private function parseUri(): string {
        $uri = $_SERVER['REQUEST_URI'] ?? '/';

        // Remove query string
        if (($pos = strpos($uri, '?')) !== false) {
            $uri = substr($uri, 0, $pos);
        }

        // Remove /api prefix if it exists
        $uri = preg_replace('#^/api#', '', $uri);

        // Remove trailing slash
        $uri = rtrim($uri, '/');

        // Ensure leading slash
        if (empty($uri) || $uri[0] !== '/') {
            $uri = '/' . $uri;
        }

        return $uri;
    }

    /**
     * Add GET route
     */
    public function get(string $path, callable $handler): void {
        $this->addRoute('GET', $path, $handler);
    }

    /**
     * Add POST route
     */
    public function post(string $path, callable $handler): void {
        $this->addRoute('POST', $path, $handler);
    }

    /**
     * Add PUT route
     */
    public function put(string $path, callable $handler): void {
        $this->addRoute('PUT', $path, $handler);
    }

    /**
     * Add DELETE route
     */
    public function delete(string $path, callable $handler): void {
        $this->addRoute('DELETE', $path, $handler);
    }

    /**
     * Add PATCH route
     */
    public function patch(string $path, callable $handler): void {
        $this->addRoute('PATCH', $path, $handler);
    }

    /**
     * Add route to routes array
     */
    private function addRoute(string $method, string $path, callable $handler): void {
        $this->routes[] = [
            'method' => $method,
            'path' => $path,
            'handler' => $handler
        ];
    }

    /**
     * Match and execute route
     */
    public function dispatch(): void {
        foreach ($this->routes as $route) {
            if ($this->requestMethod === $route['method']) {
                $pattern = $this->convertPathToRegex($route['path']);

                if (preg_match($pattern, $this->requestUri, $matches)) {
                    array_shift($matches); // Remove full match
                    call_user_func_array($route['handler'], $matches);
                    return;
                }
            }
        }

        // No route matched
        Response::notFound('Endpoint not found');
    }

    /**
     * Convert route path to regex pattern
     */
    private function convertPathToRegex(string $path): string {
        // Convert :param to named capture group
        $pattern = preg_replace('/\/:([a-zA-Z0-9_]+)/', '/(?<$1>[^/]+)', $path);

        // Escape forward slashes and add delimiters
        $pattern = '#^' . $pattern . '$#';

        return $pattern;
    }

    /**
     * Load route file
     */
    public function loadRoutes(string $file): void {
        if (file_exists($file)) {
            $routeLoader = require $file;
            if (is_callable($routeLoader)) {
                $routeLoader($this);
            }
        }
    }
}
