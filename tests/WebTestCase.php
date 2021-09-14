<?php
declare(strict_types=1);

namespace Tests;

use GuzzleHttp\Client;
use Psr\Http\Message\ResponseInterface;

abstract class WebTestCase extends TestCase
{
    private ?Client $http = null;

    public function setUp(): void
    {
        parent::setUp();

        $this->http = new Client([
            'base_uri' => sprintf('http://%s/api/v1/', $this->getEnv('APP_HOSTNAME')),
            'verify' => false,
        ]);
    }

    public function tearDown(): void
    {
        $this->http = null;

        parent::tearDown();
    }

    public function post(string $url, array $params = [], array $headers = []): ResponseInterface
    {
        $headers = [
            'Authorization' => 'Bearer askdj2isadja12'
        ];

        $postParams = [
            'headers' => $headers,
            'json' => $params,
        ];

        return $this->http->post($url, $postParams);
    }

    public function postWithArrayResponse(string $url, array $params = [], array $headers = []): array
    {
        $response = $this->post($url, $params, $headers);
        $data = $response->getBody()->getContents();
        return json_decode($data, true);
    }
}
