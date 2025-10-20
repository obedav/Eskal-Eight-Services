<?php
declare(strict_types=1);

namespace App\Exceptions;

use Exception;

/**
 * Base API Exception
 */
class ApiException extends Exception {
    protected int $statusCode = 400;
    protected mixed $errors = null;

    public function __construct(string $message = MSG_ERROR, mixed $errors = null, int $statusCode = 400) {
        parent::__construct($message);
        $this->errors = $errors;
        $this->statusCode = $statusCode;
    }

    public function getStatusCode(): int {
        return $this->statusCode;
    }

    public function getErrors(): mixed {
        return $this->errors;
    }
}
