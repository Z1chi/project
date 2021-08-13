<?php

namespace app\component;

class FloatHelper
{
	public static function formatEur ($float)
	{
		return number_format($float, 2, '.', ' ');
	}

	public static function formatBtc ($float)
	{
		return number_format($float, 8, '.', '');
	}
}