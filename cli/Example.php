<?php

namespace cli;


use app\collection\Miners;
use app\component\FloatHelper;
use system\components\DB;
use system\core\Console;

class Example extends Console
{
	public function run ()
	{
	    $this->msg('Hello World');
	}
}