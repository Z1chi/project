<?php

namespace admin\view;


use admin\model\Admin;
use affiliate\model\Affiliate;
use App;
use system\components\DB;
use system\components\Url;
use admin\component\Logger;
use admin\component\Pagination;
use system\core\AdminController;

class AffiliatesView extends AdminController
{
	public $authorizationRequired = true;

	/**
	 * @var Pagination
	 */
	private $pagination;
	private $id;

	public function init()
	{
		if (Admin::getLevel() < Admin::$LEVEL_SUPERUSER) {
			$this->show404();
		}

		$id = App::getCurrentUrl()->query->get('id');

		$this->id = $id;
	}

	public function indexAction()
	{
		$this->showList();
	}

	public function showList ()
	{
		$this->setMetaTitle('Аффилейты');

		$this->pagination = new Pagination(KEY_ON_PAGE_COUNT);

		$calls_count = $this->getAffiliatesCount();
		$this->pagination->setItemsCount($calls_count);

		$affiliates = $this->getAffiliatesList();
		$pages = $this->pagination->getPaginationHtml(MODULE_TEMPLATE . '/pagination.php');

		$this->pushTemplateData([
			'LIST' => $affiliates,
			'PAGES' => $pages
		]);
	}

	public function getAffiliatesCount ()
	{
		return $this->getAffiliatesList(true);
	}

	public function getAffiliatesList ($count_only = false)
	{
		if ($count_only) {
			$q = 'SELECT COUNT(id) ';
		} else {
			$q =
				'SELECT *';
		}

		$q .= ' FROM "' . TBL_AFFILIATE . '" WHERE 1=1 ';

		// Return list count

		if ($count_only)
		{
			$row = DB::getInstance()
				->row($q);

			return $row == NULL ? 0 : $row['count'];
		}

		$q .= ' ORDER BY id DESC ';

		$q .= ' LIMIT ' . $this->pagination->getItemsOnPage() . ' ' .
			'OFFSET ' . $this->pagination->getOffset();

		$list = DB::getInstance()
			->run($q);

		$affiliates = [];

		foreach ($list as $k => $row)
		{
			$affiliate = Affiliate::withRow($row);
			$affiliate->info_url = Url::create('/affiliates/?id=' . $affiliate->getId());
			$affiliates[] = $affiliate;
		}

		return $affiliates;
	}

	public function ajaxActivate ()
	{
		$affiliate_id = (int) $_POST['affiliate_id'];
		$active = ((int) $_POST['active']) == 1;

		$data = ['active' => $active ? 1 : 0];
		$where = ['id' => $affiliate_id];
		$log = array_merge($data, $where);

		DB::getInstance()->update(TBL_AFFILIATE, $data, $where);

		Logger::write(
			$active ?
				Logger::$ACTION_AFFILIATE_ACTIVATE :
				Logger::$ACTION_AFFILIATE_DEACTIVATE,
			$log);

		$this->jsonSuccess();
	}

	public function loginAction ()
	{
		$id = (int) $_GET['id'];

		$row = \Ufo\Model\Affiliate::where('id', $id)->first();

		if ($row) {
			Affiliate::setSession($row);
			header('Location: /affiliate');
		} else {
			$this->show404();
		}
	}
}