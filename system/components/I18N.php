<?php

namespace system\components;

//require_once LOCALIZATION . '/en.php';

/**
 * Class I18N
 * @package system\components
 */
class I18N
{
	private static $instance = null;

	private function __construct()
	{
	}

	public static function getInstance ()
    {
		if (self::$instance == null) {
			self::$instance = new i18n();
		}
		return self::$instance;
	}

	private static function getClassName ($language) {
		return 'Localization_' . $language;
	}

	public static function translate ($key, $language)
    {
        return self::getInstance()->getString($key, $language);
	}

	private function getString ($key, $language) {
        $classname = MODULE_NAME . '\localization\\' . self::getClassName($language);

		if (!isset($classname::$texts[$key])) {
			return $key;
		}

		return $classname::$texts[$key];
	}

}