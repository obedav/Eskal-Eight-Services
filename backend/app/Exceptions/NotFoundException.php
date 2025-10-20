<?php
declare(strict_types=1);

namespace App\Exceptions;

/**
 * Not Found Exception
 */
class NotFoundException extends ApiException {
    public function __construct(string $message = MSG_NOT_FOUND) {
        parent::__construct($message, null, 404);
    }
}
