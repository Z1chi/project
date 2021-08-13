<?php

namespace admin\view;


use admin\component\Logger;
use admin\model\Admin;
use system\components\DB;
use system\core\AdminController;
use system\exceptions\RequestException;

class AccountView extends AdminController
{
	public $authorizationRequired = true;

	public function init() {}

	public function indexAction()
	{

	}

    public function ajaxChange()
    {
        $admin_id = Admin::getCurrentId();

        $old_password = $_POST['password_old'];
        $new_password = $_POST['password_new'];
        $new_password_repeat = $_POST['password_new_repeat'];

        if (empty($old_password) || empty($new_password) || empty($new_password_repeat)) {
            $this->jsonErrorMsg('Пожалуйста, заполните все поля!');
        }

        $row = DB::getInstance()->row('SELECT id, password FROM "' . TBL_ADMIN . '" WHERE id = ?', $admin_id);


        if (!password_verify($old_password, $row['password'])) {
            $this->jsonErrorMsg('Неправильный пароль');
        }

        if (strlen($new_password) < 12) {
            $this->jsonErrorMsg('Длина нового пароля должна быть не менее 12 символов');
        }

        if ($new_password != $new_password_repeat) {
            $this->jsonErrorMsg('Пароли не совпадают');
        }

        DB::getInstance()
            ->update(
                TBL_ADMIN,
                [ 'password' => password_hash($new_password, PASSWORD_BCRYPT) ],
                ['id' => $admin_id]
            );

        Logger::write(Logger::$ACTION_CHANGE_PASSWORD);

        $this->jsonSuccessMsg('Пароль изменён!');
    }
}