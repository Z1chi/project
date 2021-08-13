<?php

namespace system\components;

class Util
{
	public static function sanitize($value, $default_value = '', $max_length = 0)
	{
		if (empty($value)) {
			$value = $default_value;
		}

		$value = htmlspecialchars(trim($value), ENT_QUOTES);

		if ($max_length != 0) {
			$value = mb_substr($value, 0, $max_length);
		}

		return $value;
	}

    public static function isEmailValid ($str) {
    	return preg_match('/^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))$/iD', $str);
	}

	public static function stripFromPhone ($str)
	{
		return preg_replace('~[^0-9\+]+~', '', $str);
	}

	public static function urlAlias ($string)
	{
		$old = setlocale(LC_CTYPE, '0');
		setlocale(LC_CTYPE, 'en_US.utf8');
		$string = self::cyrillicToTranslit($string);
		$string = trim($string);
		$string = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $string);

		$string = str_replace('-', '', $string);

		$que = array('  ', ' ', "\t", '+');
		$por = array(' ', '-', '-', 'plus');

		$string = str_replace($que, $por, $string);
		$string = preg_replace("/[^w+a-zA-Z0-9-\s]/", "", $string);
		$string = mb_strtolower($string, 'UTF-8');
		setlocale(LC_CTYPE, $old);

		return $string;
	}

	public static function cyrillicToTranslit($string)
	{
		$table = array(
			'А' => 'A',
			'Б' => 'B',
			'В' => 'V',
			'Г' => 'G',
			'Д' => 'D',
			'Е' => 'E',
			'Ё' => 'YO',
			'Ж' => 'ZH',
			'З' => 'Z',
			'И' => 'I',
			'Й' => 'J',
			'К' => 'K',
			'Л' => 'L',
			'М' => 'M',
			'Н' => 'N',
			'О' => 'O',
			'П' => 'P',
			'Р' => 'R',
			'С' => 'S',
			'Т' => 'T',
			'У' => 'U',
			'Ф' => 'F',
			'Х' => 'H',
			'Ц' => 'C',
			'Ч' => 'CH',
			'Ш' => 'SH',
			'Щ' => 'CSH',
			'Ь' => '',
			'Ы' => 'Y',
			'Ъ' => '',
			'Э' => 'E',
			'Ю' => 'YU',
			'Я' => 'YA',

			'а' => 'a',
			'б' => 'b',
			'в' => 'v',
			'г' => 'g',
			'д' => 'd',
			'е' => 'e',
			'ё' => 'yo',
			'ж' => 'zh',
			'з' => 'z',
			'и' => 'i',
			'й' => 'j',
			'к' => 'k',
			'л' => 'l',
			'м' => 'm',
			'н' => 'n',
			'о' => 'o',
			'п' => 'p',
			'р' => 'r',
			'с' => 's',
			'т' => 't',
			'у' => 'u',
			'ф' => 'f',
			'х' => 'h',
			'ц' => 'c',
			'ч' => 'ch',
			'ш' => 'sh',
			'щ' => 'csh',
			'ь' => '',
			'ы' => 'i',
			'ъ' => '',
			'э' => 'e',
			'ю' => 'ju',
			'я' => 'ja',
		);

		$output = str_replace(array_keys($table), array_values($table), $string);
		return $output;
	}

	public static function translitToCyrillic($string)
	{
		$table = array(
			'A' => 'А',
			'B' => 'Б',
			'V' => 'В',
			'G' => 'Г',
			'D' => 'Д',
			'E' => 'Е',
			'YO' => 'Ё',
			'ZH' => 'Ж',
			'Z' => 'З',
			'I' => 'И',
			'J' => 'Й',
			'K' => 'К',
			'L' => 'Л',
			'M' => 'М',
			'N' => 'Н',
			'O' => 'О',
			'P' => 'П',
			'R' => 'Р',
			'S' => 'С',
			'T' => 'Т',
			'U' => 'У',
			'F' => 'Ф',
			'H' => 'Х',
			'C' => 'Ц',
			'CH' => 'Ч',
			'SH' => 'Ш',
			'CSH' => 'Щ',
			//'' => 'Ь',
			'Y' => 'Ы',
			//'' => 'Ъ',
			//'E' => 'Э',
			'YU' => 'Ю',
			'YA' => 'Я',

			'a' => 'а',
			'b' => 'б',
			'v' => 'в',
			'g' => 'г',
			'd' => 'д',
			'e' => 'е',
			'yo' => 'ё',
			'zh' => 'ж',
			'z' => 'з',
			'i' => 'и',
			'j' => 'й',
			'k' => 'к',
			'l' => 'л',
			'm' => 'м',
			'n' => 'н',
			'o' => 'о',
			'p' => 'п',
			'r' => 'р',
			's' => 'с',
			't' => 'т',
			'u' => 'у',
			'f' => 'ф',
			'h' => 'х',
			'c' => 'ц',
			'ch' => 'ч',
			'sh' => 'ш',
			'csh' => 'щ',
			'\'' => 'ь',
			'y' => 'ы',
			//'' => 'ъ',
			//'e' => 'э',
			'yu' => 'ю',
			'ya' => 'я',
		);

		$output = str_replace(array_keys($table), array_values($table), $string);
		return $output;
	}
}