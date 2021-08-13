<?php

namespace admin\view;


use admin\component\Logger;
use admin\model\Admin;
use system\components\DB;
use system\components\Vars;
use system\core\AdminController;

class PreferencesView extends AdminController
{
	public function init()
	{
		if (Admin::getLevel() < Admin::$LEVEL_SUPERUSER) {
			$this->show404();
		}
	}

	public function indexAction ()
	{
		$this->pushLayoutData([
			'LIST' => Vars::getList()
		]);
	}

	public function ajaxSave ()
	{
		$key = trim(htmlspecialchars($_POST['key'], ENT_QUOTES));
		$value = trim(htmlspecialchars($_POST['value'], ENT_QUOTES));

		$array = [
			'key' => $key,
			'value' => $value
		];

		$is_exists = Vars::isExists($key);

		if ($is_exists) {
			DB::getInstance()->update(TBL_VARIABLES, [
				'value' => $value
			], ['key' => $key]);
		} else {
			DB::getInstance()->insert(TBL_VARIABLES, $array);
		}

		Logger::write(Logger::$ACTION_UPDATE_VARIABLE, $array);

		$this->jsonSuccess();
	}
}