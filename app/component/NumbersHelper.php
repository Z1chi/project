<?php

namespace app\component;

class NumbersHelper
{
	public static function checkBtcAddress ($str) {
		return preg_match('~^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$~im', $str);
	}

	public static function formatBtcToFloat ($str)
	{
		return (float) self::formatBtcToOutput($str);
	}

	public static function formatBtcToOutput ($str) {

		$f = $str;

		if (!$f || $f == '') {
			$f = 0.0;
		}

		return number_format($f, 8, '.', '');
	}

	public static function formatEur ($number)
	{
		$floor = floor($number * 100) / 100;
		$number = number_format($floor, 2, '.', ' ');

		return $number;
	}
}