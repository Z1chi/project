<?php
declare(strict_types=1);

namespace Tests;

use Ufo\Service\DatabaseService;

abstract class TestCase extends \PHPUnit\Framework\TestCase
{
    public function __construct(?string $name = null, array $data = [], $dataName = '')
    {
        parent::__construct($name, $data, $dataName);

        $databaseService = new DatabaseService();
        $databaseService->initEloquent();
    }

    protected function getEnv(string $name)
    {
        return getenv($name);
    }
}