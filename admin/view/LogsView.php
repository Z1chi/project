<?php

namespace admin\view;

use admin\component\Logger;
use admin\component\Pagination;
use admin\model\Admin;
use App;
use system\components\DB;
use system\core\AdminController;

class LogsView extends AdminController
{
	private $pagination;

	public function indexAction ()
	{
		if (Admin::getLevel() < Admin::$LEVEL_CALL_CENTER_SUPERVISOR) {
			$this->show404();
		}

		$this->showList();
	}

	private function showList ()
	{
		$this->pagination = new Pagination(KEY_ON_PAGE_COUNT);

		$calls_count = $this->getListCount();
		$this->pagination->setItemsCount($calls_count);

		$subscribers = $this->getList();

		$pages = $this->pagination->getPaginationHtml(MODULE_TEMPLATE . '/pagination.php');

		$this->pushTemplateData([
			'LIST' => $subscribers,
			'PAGES' => $pages
		]);
	}


	public function getList ()
	{
		$query = 'SELECT l.*, a.name admin_name 
				  	FROM ' . TBL_LOG_ADMIN . ' l 
				  LEFT JOIN admin a 
				  	ON l.admin_id = a.id 
				  ORDER BY created DESC ' .
			'LIMIT ' . $this->pagination->getItemsOnPage() . ' ' .
			'OFFSET ' . $this->pagination->getOffset();

		$list = DB::getInstance()
			->run($query);

		return $list;
	}

	public function getListCount ()
	{
		$q = 'SELECT COUNT(id) FROM ' . TBL_LOG_ADMIN;

		$row = DB::getInstance()
			->row($q);

		return $row == NULL ? 0 : $row['count'];
	}
}