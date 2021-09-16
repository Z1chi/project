<?php
declare(strict_types=1);

namespace Tests\Functional;

use Tests\WebTestCase;

/**
 * @todo split to files
 */
final class SignupTest extends WebTestCase
{
    public function testSignup(): void
    {
        $params = [
            'event_name' => 'signup',
            'smartlink' => 'qnm8zm',
            'user_uid' => 'SHAKSDJASDAS132',
            'ip' => '127.0.0.1',
            'datetime' => '2020-01-01 01:01:01',
        ];

        $data = $this->postWithArrayResponse('event', $params);
        $this->assertArrayHasKey('url', $data);
        $this->assertArrayHasKey('affiliate', $data);
        $this->assertGreaterThanOrEqual(1, $data['url']['id']);
        $this->assertGreaterThanOrEqual(1, $data['affiliate']['id']);
    }

    public function testClick(): void
    {
        $params = [
            'event_name' => 'click',
            'user_uid' => 'SHASDSDAKSD111',
            'smartlink' => 'qnm8zm',
            'ip' => '127.0.0.1',
            'geo' => null,
            'unique' => true,
            'http_referrer' => null,
            'datetime' => '2010-01-12 00:00:00'
        ];

        $data = $this->postWithArrayResponse('event', $params);
        $this->assertArrayHasKey('url', $data);
        $this->assertArrayHasKey('affiliate', $data);
    }

    public function testDeposit(): void
    {
        $userUid = 'SHAKSDJASDAS13';
        $params = [
            'event_name' => 'deposit',
            'smartlink' => 'qnm8zm',
            'user_uid' => $userUid,
            'ip' => '127.0.0.1',
            'currency' => 'BTC',
            'deposit' => '0.000001',
            'datetime' => '2020-02-02 10:00:00'
        ];

        $data = $this->postWithArrayResponse('event', $params);
        $this->assertArrayHasKey('url', $data);
        $this->assertArrayHasKey('affiliate', $data);
        $this->assertArrayHasKey('payout', $data);
        $this->assertEquals($userUid, $data['payout']['user_uid']);
    }
}
