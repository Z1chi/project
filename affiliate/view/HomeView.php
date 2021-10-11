<?php

namespace affiliate\view;

use affiliate\component\Logger;
use App;
use app\controller\UserSession;
use PHPUnit\Exception;
use system\components\DB;
use system\components\Util;
use system\core\AffiliateController;
use system\components\Tokenizer;
use affiliate\model\Affiliate;
use system\exceptions\RequestException;
use Ufo\Model\RecoveryToken;
use Ufo\Service\RecoveryTokenService;

class HomeView extends AffiliateController
{
	// This viewcontroller should be used only for login/logout!
	// Because of security and AffiliateController conditions

	public function indexAction()
    {
    	if (!Affiliate::isSigned())
    	{
//			$this->pushLayoutData([
//				'token' => Tokenizer::get('auth', true)
//			]);
		} else {
    		$this->redirectToPath('/dashboard');
		}
    }

    public function ajaxHeartbeat ()
	{
		if (Affiliate::isSigned()) {
			$_SESSION[SESSION_KEY_CURRENT]['time'] = time();
		}

		$this->jsonSuccess();
	}

	public function ajaxLogout()
	{
		Affiliate::logOut();
		$this->jsonSuccess();
	}

	public function ajaxAuth()
	{
		if (Affiliate::isSigned()) {
			$this->jsonError();
			exit();
		}

		try {
//			Tokenizer::ajaxCheckToken($_POST['token'], 'auth');

			$login = trim($_POST['login']);
			$password = $_POST['password'];

			Affiliate::signIn($login, $password);

			Logger::write(Logger::$ACTION_LOGIN);

			$this->jsonSuccess();
		} catch (RequestException $e) {
			$this->jsonErrorMsg($e->getMessage());
		}
	}

	public function ajaxSignup()
	{
		$email = Util::sanitize($_POST['email'], null, 128);
		$password = $_POST['password'];
		$telegram = Util::sanitize($_POST['telegram'], null, 32);

		$first_name = Util::sanitize($_POST['first_name'], null, 64);
		$last_name = Util::sanitize($_POST['last_name'], null, 64);

		$error = new \stdClass();

		if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$error->email = 'Incorrect e-mail!';
		}

		if ($_POST['password'] != $_POST['password_repeat']) {
			$error->password_repeat = 'The passwords do not match!';
		}

		$is_exsits_email = mb_strtolower($email);

		$is_exists = DB::getInstance()
			->row('SELECT id FROM "' . TBL_AFFILIATE . '" WHERE lower(email) = ?', $is_exsits_email);

		if ($is_exists) {
			$error->email = 'This user name already exists!';
		}

		if (mb_strlen($_POST['password']) < 10) {
			$error->password = 'The password is too short!';
		}

		if ($telegram != null && mb_strlen($telegram) < 3) {
			$error->telegram = 'This field is required!';
		}

		if (mb_strlen($first_name) < 2) {
			$error->first_name = 'This field is required!';
		}

		if (mb_strlen($last_name) < 2) {
			$error->last_name = 'This field is required!';
		}

		if ($error != new \stdClass()) {
			$this->jsonErrorData($error);
		}

		$data = array
		(
			'first_name' => $first_name,
			'last_name' => $last_name,
			'email' => $email,
			'telegram' => $telegram,
			'password' => password_hash($password, PASSWORD_BCRYPT),
			'created' => time(),
			'active' => 0,
			'revshare_percent' => AFFILIATE_REVSHARE_PERCENT,
			'first_deposit_percent' => AFFILIATE_DEPOSIT_PERCENT
		);

		$signup_result = self::create($data);

		if ($signup_result)
		{
			$this->jsonSuccessMsg('');
		} else {
			$this->jsonError();
		}
	}

    public function ajaxForgot(): void
    {
//        $email = Util::sanitize($_POST['email'], null, 128);
        $email = 'korzinkayablok@gmail.com';
        $affiliate = \Ufo\Model\Affiliate::firstWhere('email', $email);

        if (!empty($affiliate)) {
            $token = new RecoveryToken();
            $token->affiliate_id = $affiliate->id;
            $tokenStr = bin2hex(random_bytes(16));
            $token->token = $tokenStr;
            if ($token->save()) {
                $recoveryService = new RecoveryTokenService();
                if ($recoveryService->sendRecoveryMail($email, $tokenStr)) {
                    $this->jsonSuccess();
                } else {
                    $this->jsonErrorMsg("Message hasn't been sent");
                }
            } else {
                $this->jsonErrorMsg("Token hasn't been saved");
            }

        } else {
            $this->jsonErrorMsg("There is no such user");
        }
    }

	public static function create ($data)
	{
		$user_id = false;

		try {
			$user_id = DB::getInstance()
				->insertGet(TBL_AFFILIATE, $data, 'id');
		} catch (\Exception $e) {
		}

		return $user_id;
	}
}