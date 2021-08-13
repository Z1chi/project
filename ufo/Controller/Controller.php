<?php
declare(strict_types=1);

namespace Ufo\Controller;

class Controller extends \system\core\Controller
{
    protected function jsonResponse(array $responseData = [], int $responseCode = 200): void
    {
        header('Content-Type: application/json');
        http_response_code($responseCode);
        echo json_encode($responseData);
        exit;
    }
}
