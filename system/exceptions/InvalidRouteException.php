<?php

namespace system\exceptions;

class InvalidRouteException extends \Exception
{
    public function getName()
    {
        return 'Invalid Route';
    }
}