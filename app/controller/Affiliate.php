<?php

namespace app\controller;


use app\component\Browser;
use app\component\HashidHelper;
use system\components\DB;
use system\components\Util;
use Purl\Url;

class Affiliate
{

	const ACTION_CLICK = 1;
	const ACTION_SIGNUP = 2;
	const ACTION_DEPOSIT = 3;

	const IFRAME_TYPE_CONVERSION = 1;
	const IFRAME_TYPE_DEPOSIT = 2;

	public static function parseAffiliateUrl ()
	{
		if (isset($_GET[AFFILIATE_URL_GET_KEY])) {
			$invite_id = $_GET[AFFILIATE_URL_GET_KEY];

			$url_id = HashidHelper::decodeSmartlinkId($invite_id);

			if ($url_id != false)
			{
				self::logClick($url_id);
				self::removeParamRedirect(AFFILIATE_URL_GET_KEY);
			}
		}
	}

    /**
     * @deprecated
     */
	public static function logClick ($url_id)
	{
		$ip = $_SERVER['REMOTE_ADDR'];
		$geo = Browser::getGeo($ip);

		$url = DB::getInstance()->row('SELECT id, affiliate_id FROM ' . TBL_AFFILIATE_URL .' WHERE id = ?', $url_id);

		if ($url)
		{
			$unique = 1;
			$referrer = null;

			if (isset($_SERVER['HTTP_REFERER'])) {
				$referrer = Util::sanitize($_SERVER['HTTP_REFERER']);
			}

			if (isset($_COOKIE[AFFILIATE_URL_COOKIE_KEY])) {
				if ($_COOKIE[AFFILIATE_URL_COOKIE_KEY] == $url['id']) {
					$unique = 0;
				}
			}

			setcookie(AFFILIATE_URL_COOKIE_KEY, $url['id'], time() + (3650 * 86400), '/', $_SERVER['HTTP_HOST'], PRODUCTION);

			$data = [
				'affiliate_id' => $url['affiliate_id'],
				'url_id' => $url['id'],
				'project_id' => $url['project_id'],
				'action' => self::ACTION_CLICK,
				'created' => time(),
				'ip' => $ip,
				'geo' => $geo,
				'unique' => $unique,
				'http_referrer' => $referrer
			];

			DB::getInstance()->insert(TBL_AFFILIATE_ACTION_LOG, $data);
		}
	}

    /**
     * @deprecated
     */
	public static function logSignup ($user_id)
	{
		if (!isset($_COOKIE[AFFILIATE_URL_COOKIE_KEY])) {
			return false;
		}

		$url_id = $_COOKIE[AFFILIATE_URL_COOKIE_KEY];

		$ip = $_SERVER['REMOTE_ADDR'];
		$geo = Browser::getGeo($ip);

		$url = DB::getInstance()->row('SELECT id, affiliate_id, project_id FROM ' . TBL_AFFILIATE_URL .' WHERE id = ?', $url_id);

		if ($url)
		{
			$data = [
				'affiliate_id' => $url['affiliate_id'],
				'url_id' => $url['id'],
				'user_id' => $user_id,
				'project_id' => $url['project_id'],
				'action' => self::ACTION_SIGNUP,
				'created' => time(),
				'ip' => $ip,
				'geo' => $geo
			];

			DB::getInstance()->insert(TBL_AFFILIATE_ACTION_LOG, $data);
		}
	}

    /**
     * @deprecated
     */
	public static function logDeposit ($user_id, $affiliate_id, $url_id, $deposit, $payout, $currency, $project_id)
	{
		$geo = null;

		if (isset($_SERVER['REMOTE_ADDR']))
		{
			$ip = $_SERVER['REMOTE_ADDR'];
			$geo = Browser::getGeo($ip);
		}

		$currency = mb_strtoupper($currency);

		$data = [
			'affiliate_id' => $affiliate_id,
			'url_id' => $url_id,
			'user_id' => $user_id,
			'project' => $project_id,
			'action' => self::ACTION_DEPOSIT,
			'created' => time(),
			'ip' => $ip,
			'geo' => $geo,
			'deposit' => $deposit,
			'currency' => $currency,
			'payout' => $payout
		];

		DB::getInstance()->insert(TBL_AFFILIATE_ACTION_LOG, $data);
	}

	public static function showIframe ($user_id, $type)
	{
		$user = DB::getInstance()
			->row('SELECT affiliate_url_id FROM "' . TBL_USER .'" WHERE id = ?', $user_id);

		if ($user) {

			$url = DB::getInstance()
				->row('SELECT iframe_lead, iframe_conversion FROM ' . TBL_AFFILIATE_URL . ' WHERE id = ?', $user['affiliate_url_id']);

			if ($url) {

				$cell = null;

				switch ($type) {
					case self::IFRAME_TYPE_CONVERSION:
						$cell = 'iframe_lead';
						break;

					case self::IFRAME_TYPE_DEPOSIT:
						$cell = 'iframe_conversion';
						break;
				}

				if ($cell != null && $url[$cell] != null)
				{
					return '<iframe class="fireup" src="' . $url[$cell] . '"></iframe>';
				}

			}
		}

		return '';

	}

	private static function removeParamRedirect ($param)
	{
        $currentUrl = Url::fromCurrent();
        $currentUrl->query->set($param, null);

		header('Location: ' . $currentUrl);
		exit;
	}
}