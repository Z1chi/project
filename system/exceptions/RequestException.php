<?php

namespace system\exceptions;

class RequestException extends \Exception
{
    private $errors = [];

    public function __construct($data = '')
    {
        if (is_string($data)) {
            $this->message = $data;
        } else if (is_array($data)) {
            $this->errors = $data;
        }
    }

    public function getErrors()
    {
        return $this->errors;
    }
}