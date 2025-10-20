<?php
declare(strict_types=1);

namespace App\Exceptions;

/**
 * Authentication Exception
 */
class AuthException extends ApiException {
    public function __construct(string $message = MSG_UNAUTHORIZED) {
        parent::__construct($message, null, 401);
    }
}
