<?php

namespace system\core;

use admin\model\Admin;

abstract class AdminController extends Controller
{
    private ?\Ufo\Model\Admin $admin = null;

    public function init()
    {
    	// Unauthorized: set template

        if (!Admin::isSigned()) {
            $this->layout  = MODULE_LAYOUT . '/auth.php';
        }
    }

    public function beforeAction($is_ajax)
    {
		// Logout on session timeout

        if (Admin::isSigned() && time() - $_SESSION[SESSION_KEY_CURRENT]['time'] > SESSION_TIMEOUT) {
            Admin::logOut(true);
            $this->redirectToPath();
        }
    }

    public function afterAction()
    {
    	// Works only in standard requests

        if (Admin::isSigned()) {
            $_SESSION[SESSION_KEY_CURRENT]['time'] = time();
        }
    }

	public function setMetaTitle ($string)
	{
		$this->title = $string;
	}

    protected function getAdmin(): Admin
    {
        if (null === $this->admin) {
            $this->admin = \Ufo\Model\Admin::find($this->getAdminId());
        }
        return $this->admin;
    }

    protected function getAdminFromSession(): array
    {
        return $_SESSION['module_admin'] ?? [];
    }

	protected function getAdminId(): int
    {
        $admin = $this->getAdminFromSession();
        if (!isset($admin['id'])) {
            // todo Log this
            throw new \LogicException('Нету админа');
        }

        return $admin['id'];
    }
}