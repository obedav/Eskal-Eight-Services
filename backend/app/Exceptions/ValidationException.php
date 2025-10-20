<?php
declare(strict_types=1);

namespace App\Exceptions;

/**
 * Validation Exception
 */
class ValidationException extends ApiException {
    public function __construct(array $errors, string $message = MSG_VALIDATION_ERROR) {
        parent::__construct($message, $errors, 422);
    }
}
