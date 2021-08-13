<?php

namespace admin\view;

use admin\component\Logger;
use system\components\Util;
use system\core\AdminController;
use system\components\Tokenizer;
use admin\model\Admin;
use system\exceptions\RequestException;

class HomeView extends AdminController
{
	// This viewcontroller should be used only for login/logout!
	// Because of security and AdminController conditions

	public function indexAction()
    {
    	if (!Admin::isSigned())
    	{
			$this->pushLayoutData([
				'token' => Tokenizer::get('auth', true)
			]);
		} else {
    		$this->redirectToPath('/affiliates');
		}
    }

    public function ajaxHeartbeat ()
	{
		if (Admin::isSigned()) {
			$_SESSION[SESSION_KEY_CURRENT]['time'] = time();
		}

		$this->jsonSuccess();
	}

	public function ajaxLogout()
	{
		Admin::logOut();
		$this->jsonSuccess();
	}

	public function ajaxAuth()
	{
		if (Admin::isSigned()) {
			$this->jsonError();
			exit();
		}

		try {
			Tokenizer::ajaxCheckToken($_POST['token'], 'auth');

			$login = trim($_POST['login']);
			$password = $_POST['password'];

			Admin::signIn($login, $password);

			Logger::write(Logger::$ACTION_LOGIN);

			$this->jsonSuccess();
		} catch (RequestException $e) {
			$this->jsonErrorMsg('Incorrect login');
		}
	}
}