<?php

namespace app\controller;


use App;
use app\model\User;
use system\components\DB;
use system\components\Url;
use system\core\Template;
use system\exceptions\RequestException;

class UserSession
{
	public static function isSigned()
	{
		if (!empty($_SESSION[SESSION_KEY_CURRENT])) {
			self::updateActivity($_SESSION[SESSION_KEY_CURRENT]['id']);
			return true;
		}

		return false;
	}

	public static function signIn($email, $password)
	{
		if (empty($email) || empty($password)) {
			throw new RequestException();
		}

		$row = DB::getInstance()
			->row(
				'SELECT * 
				  		  FROM "' . TBL_USER . '" 
				  		  WHERE lower(email) = lower(?) AND account_status NOT IN (' . User::STATUS_BANNED . ')', $email);

		if (!$row || !password_verify($password, $row['password'])) {
			throw new RequestException('Incorrect login');
		}

		static::setUserId($row['id']);

		return true;
	}

	public static function setUserId ($id) {
		$_SESSION[SESSION_KEY_CURRENT]['id'] = $id;
	}

	public static function updateSession ($id = NULL)
	{
		if ($id == NULL) {
			$id = $_SESSION[SESSION_KEY_CURRENT]['id'];
		}

		$row = DB::getInstance()
			->row('SELECT 
								id, 
								email, 
								first_name,
								last_name, 
								phone, 
								language,
								activity,
								created,
								updated,
								is_email_verified,
								balance_btc,
								middle_name,
								referrer_id
								
						 	 FROM "' . TBL_USER . '" 
						  	 WHERE id = ?', $id);

		if ($row)
		{
			$_SESSION[SESSION_KEY_CURRENT] = $row;
		}
	}

	public static function signOut()
	{
	    if (isset($_SESSION[SESSION_KEY_CURRENT])) {
            unset($_SESSION[SESSION_KEY_CURRENT]);
        }
	}

	public static function getSession ()
	{
	    if (!isset($_SESSION[SESSION_KEY_CURRENT]))
        {
            return [];
        }

		$row = DB::getInstance()
			->row('SELECT *
						 	 FROM "' . TBL_USER . '" 
						  	 WHERE id = ?', $_SESSION[SESSION_KEY_CURRENT]['id']);

		if ($row['ip'] == NULL) {
			DB::getInstance()
				->update(TBL_USER, ['ip' => $_SERVER['REMOTE_ADDR']], ['id' => $row['id']]);
		}

		return $row;
	}

	public static function updateActivity ($id)
	{
		DB::getInstance()
			->update(TBL_USER,
				['activity' => time(),
				'language' => App::getLanguage()],
				['id' => $id]
			);
	}

	public static function recover ($email)
	{
		$user_id = DB::getInstance()
			->cell('SELECT id FROM "' . TBL_USER . '" WHERE email = ?', $email);

		if (!$user_id) return false;

		$token = md5($email . microtime());

		$result_email = self::sendRecoveryMail($email, $token);

		if (!$result_email) return false;

		self::createUserToken($user_id, $token);

		return true;
	}

	public static function createUserToken ($user_id, $token)
	{
		// todo token controller

		DB::getInstance()
			->delete(TBL_USER_TOKEN,
				[
					'user_id' => $user_id,
					'action' => 'password_recovery'
				]);

		$data = [
			'user_id' => $user_id,
			'action' => 'password_recovery',
			'token' => $token,
			'created' => time()
		];

		DB::getInstance()->insert(TBL_USER_TOKEN, $data);
	}

	public static function sendRecoveryMail ($email, $token)
	{
		$url = Url::createRaw('/signup/password/?token=' . $token);

		$tpl_file = SYSTEM . '/template/email/text_button_url.php';
		$tpl = new Template($tpl_file);

		$tpl->init([
			'BUTTON_URL' => $url,
			'TITLE' => App::t('recovery_email_title'),
			'TEXT' => App::t('recovery_email_text'),
			'BUTTON_TEXT' => App::t('recovery_email_button_text'),
			'APP_NAME' => APP_PUBLIC_NAME,
			'YEAR' => date('Y'),
			'URL_ASSETS' => App::getEmailAssetsUrl(),
			'TEXT_TIP' => '',
			'TEXT_TEAM' => App::t('email_project_team'),
		]);
		$html = $tpl->render();

		$mail = App::getMailer();

		$mail->addAddress($email);
		$mail->Subject = App::t('recovery_subject');
		$mail->MsgHTML($html);

		try {
			$mail->send();
		} catch (phpmailerException $e) {
//			Log::e('phpmailerException', $e->errorMessage());
			return false;
		}

		return true;
	}

	public static function getCurrent ()
	{
		return $_SESSION[SESSION_KEY_CURRENT];
	}

	public static function getId ()
	{
		return $_SESSION[SESSION_KEY_CURRENT]['id'];
	}
}