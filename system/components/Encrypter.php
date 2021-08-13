<?php

namespace system\components;

use Defuse\Crypto\Crypto;
use Defuse\Crypto\Key;

class Encrypter
{
    private $key;

    public function __construct($key)
    {
        $cryptoKey = Key::loadFromAsciiSafeString($key);
        $this->key = $cryptoKey->saveToAsciiSafeString();
    }

    public function en($text)
    {
        $encrypted = Crypto::encrypt($text, Key::loadFromAsciiSafeString($this->key));

        return base64_encode($encrypted);
    }

    public function de ($text)
    {
        $text = base64_decode($text);
        $decrypted = Crypto::decrypt($text, Key::loadFromAsciiSafeString($this->key));

        return $decrypted;
    }
}