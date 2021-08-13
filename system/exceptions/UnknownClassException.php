<?php

namespace system\exceptions;

class UnknownClassException extends \Exception
{
    public function getName()
    {
        return 'Unknown Class';
    }
}