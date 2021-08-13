<?php

namespace system\core;

use affiliate\model\Affiliate;
use App;

abstract class AffiliateController extends Controller
{
    public function init()
    {
    	// Unauthorized: set template

		App::$app->setLanguage('en');

		$signup = false;

        if (!Affiliate::isSigned())
        {
			$this->layout  = MODULE_LAYOUT . '/auth.php';

        	if (isset($_GET['start']) && $_GET['start'] == 'signup') {
				$signup = true;
			}
        }

		$this->pushLayoutData(['SIGNUP' => $signup]);
    }

    public function beforeAction($is_ajax)
    {
		// Logout on session timeout

        if (Affiliate::isSigned() && time() - $_SESSION[SESSION_KEY_CURRENT]['time'] > SESSION_TIMEOUT) {
			Affiliate::logOut(true);
            $this->redirectToPath();
        }
    }

    public function afterAction()
    {
    	// Works only in standard requests

        if (Affiliate::isSigned()) {
            $_SESSION[SESSION_KEY_CURRENT]['time'] = time();
        }
    }
}