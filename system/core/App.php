<?php

use app\component\SvgLoader;
use app\controller\UserSession;
use app\model\User;
use PHPMailer\PHPMailer\PHPMailer;
use system\components\Url;
use system\components\Vars;
use system\RunApp;
use system\exceptions\UnknownClassException;

class App
{
	/**
	 * The application instance (RunApp static wrapper)
	 *
	 * @var RunApp
	 */
	public static $app;

	/**
	 * This method is invoked automatically when PHP sees an unknown namespaced class
	 *
	 * @param string $className
	 * @throws UnknownClassException
	 */
	public static function autoload($className)
	{
		$classFile = ROOT . '/' . str_replace('\\', '/', $className) . '.php';

		if (!is_file($classFile)){
			return;
		}

		include $classFile;

		if (!class_exists($className, false) && !interface_exists($className, false) && !trait_exists($className, false)){
			throw new UnknownClassException("Unable to find '$className' in file: $classFile. Namespace missing?");
		}
	}

	public static function t($message, $language = null)
	{
		return static::$app->getI18n()->translate(trim($message), $language ?: static::$app->getLanguage());
	}

	public static function getVar($key, $default = '')
	{
		return Vars::get($key, $default);
	}

	public static function getLanguage()
	{
		return static::$app->getLanguage();
	}

	public static function getLanguagesList()
	{
		$list = unserialize(LANGUAGES_ARRAY);
		return $list;
	}

	public static function createUrl($controller = null, $action = null, $base_url = null)
	{
		return Url::create($controller, $action, $base_url);
	}

	public static function createRawUrl($path)
	{
		return Url::createRaw($path);
	}

	public static function getRouter ()
	{
		return static::$app->getRouter();
	}

	public static function getSession ($key)
	{
		if (!isset($_SESSION[SESSION_KEY_CURRENT])) {
			return NULL;
		}

		if (!isset($_SESSION[SESSION_KEY_CURRENT][$key])) {
			return NULL;
		}

		return $_SESSION[SESSION_KEY_CURRENT][$key];
	}

	public static function setSession ($key, $value)
	{
		$_SESSION[SESSION_KEY_CURRENT][$key] = $value;
	}

	/**
	 * @return \Purl\Url
	 */
	public static function getCurrentUrl ()
	{
		return Purl\Url::fromCurrent();
	}

	public static function getMailer ()
	{
		$mail = new PHPMailer(true);

		if (!PRODUCTION) {

			$mail->Host = getenv('SMTP_HOST');
			$mail->isSMTP();

			$mail->SMTPOptions = array(
				'ssl' => array(
					'verify_peer' => false,
					'verify_peer_name' => false,
					'allow_self_signed' => true
				)
			);
		}

		$mail->setFrom(EMAIL_NOREPLY, EMAIL_NAME);

		// DKIM for production

		if (PRODUCTION)
		{
			$mail->DKIM_domain = getenv('APP_HOSTNAME');
			$mail->DKIM_private = RESOURCES . '/' . getenv('DKIM_FILENAME');
			$mail->DKIM_selector = getenv('DKIM_SELECTOR');
			$mail->DKIM_passphrase = '';
			$mail->DKIM_identity = $mail->From;
		}

		$mail->IsHTML(true);
		$mail->CharSet="utf-8";

		return $mail;
	}

	public static function loadSvg ($path)
	{
		return SvgLoader::file($path);
	}

	public static function getCurrentUser ()
	{
		$session = UserSession::getSession();

		$user = User::withRow($session);

		return $user;
	}

	public static function is2FApassed ()
	{
		if (
			!self::getCurrentUser()->has2Factor() ||
			(self::getCurrentUser()->has2Factor() && self::getSession('fa2_passed'))
		) {
			return true;
		}

		return false;
	}

	public static function getMinDepositForCurrent ()
	{
		$geo = self::getUserGeo();
		return self::getMinDeposit($geo);
	}

	public static function getMinDeposit ($geo)
	{
		$tier1 = ['AU', 'AT', 'BE', 'CA', 'DK', 'FI', 'FR', 'DE', 'IE', 'LU', 'NL', 'NZ', 'NO', 'SE', 'CH', 'GB', 'US'];
		$tier3 = ['DZ', 'AO', 'SH', 'BJ', 'BW', 'BF', 'BI', 'CM', 'CV', 'CF', 'TD', 'KM', 'CG', 'CD', 'DJ', 'EG', 'GQ', 'ER', 'SZ', 'ET', 'GA', 'GM', 'GH', 'GN', 'GW', 'CI', 'KE', 'LS', 'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU', 'YT', 'MA', 'MZ', 'NA', 'NE', 'NG', 'ST', 'RE', 'RW', 'ST', 'SN', 'SC', 'SL', 'SO', 'ZA', 'SS', 'SH', 'SD', 'SZ', 'TZ', 'TG', 'TN', 'UG', 'CD', 'ZM', 'TZ', 'ZW', 'IN'];

//		$tier2 = ['RU', 'BY', 'VE', 'AR', 'CO', 'PE'];

		$min_deposit = 250;

		if (in_array($geo, $tier3)) {
			$min_deposit = 150;
		} else if (in_array($geo, $tier1)) {
			$min_deposit = 500;
		}

//		if (in_array($geo, $tier2)) {
//			$min_deposit = 100;
//		}

		return $min_deposit;
	}

	public static function getUserGeo ()
	{
		$ip = $_SERVER['REMOTE_ADDR'];
		return \app\component\Browser::getGeo($ip);
	}

	public static function getBaseUrl ()
	{
		$url = getenv('APP_SCHEME') . '://' . getenv('APP_HOSTNAME');
		return $url;
	}

	public static function getEmailAssetsUrl ()
	{
		return self::getBaseUrl() . '/assets/img/email';
	}
}

spl_autoload_register(['App', 'autoload'], true, true);
