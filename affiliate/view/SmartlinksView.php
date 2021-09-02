<?php

namespace affiliate\view;


use admin\component\Pagination;
use affiliate\component\Logger;
use affiliate\model\Project;
use App;
use app\collection\Miners;
use app\component\HashidHelper;
use affiliate\model\Smartlink;
use app\model\User;
use system\components\DB;
use system\components\Url;
use system\components\Util;
use system\core\AffiliateController;

class SmartlinksView extends AffiliateController
{
	public $authorizationRequired = true;
	public $query = '';

	/**
	 * @var Pagination
	 */
	private $pagination;
	private $id;
	private $affiliate_id;

	public function init()
	{
		$this->affiliate_id = $_SESSION[SESSION_KEY_CURRENT]['id'];
	}

	public function indexAction()
	{
		$this->showList();
	}

	public function showList ()
	{
		$this->pagination = new Pagination(KEY_ON_PAGE_COUNT);

		$calls_count = $this->getSmartlinksCount();
		$this->pagination->setItemsCount($calls_count);

		$subscribers = Smartlink::getSmartlinksList($this->affiliate_id, $this->pagination);

		$pages = $this->pagination->getPaginationHtml(MODULE_TEMPLATE . '/pagination.php');

		$this->pushTemplateData([
			'LIST' => $subscribers,
			'PROJECTS' => Project::getProjects(),
			'PAGES' => $pages,
			'QUERY' => $this->query
		]);
	}

	public function getSmartlinksCount ()
	{
		$q = 'SELECT COUNT(id) FROM "' . TBL_AFFILIATE_URL . '" WHERE affiliate_id =  ' . $this->affiliate_id . ' AND deleted=0';

		$row = DB::getInstance()
			->row($q);

		return $row == NULL ? 0 : $row['count'];
	}

	public function getSmartlinksList ()
	{
		$q = 'SELECT * FROM "' . TBL_AFFILIATE_URL . '" WHERE affiliate_id =  ' . $this->affiliate_id . ' AND deleted=0';

		$q .= 'ORDER BY id DESC ' .
			'LIMIT ' . $this->pagination->getItemsOnPage() . ' ' .
			'OFFSET ' . $this->pagination->getOffset();

		$list = DB::getInstance()
			->run($q);

		$smartlinks = [];

		foreach ($list as $k => $row)
		{
			$smartlink = Smartlink::withRow($row);

			$smartlinks[] = $smartlink;
		}

		return $smartlinks;
	}

//	public function ajaxSave ()
//	{
//		$id = (int) $_POST['id'];
//		$value = Util::sanitize($_POST['title']);
//
//		$array = [
//			'id' => $id,
//			'title' => $value
//		];
//
//		DB::getInstance()
//			->update(
//				TBL_AFFILIATE_URL,
//				['title' => $value],
//				['id' => $id, 'affiliate_id' => $this->affiliate_id]
//			);
//
//		Logger::write(Logger::$ACTION_URL_UPDATE, $array);
//
//		$this->jsonSuccess();
//	}

	public function ajaxDelete ()
	{
		$id = (int) $_POST['id'];

		$array = [
			'id' => $id
		];

		DB::getInstance()
			->update(
				TBL_AFFILIATE_URL,
				['deleted' => 1],
				['id' => $id, 'affiliate_id' => $this->affiliate_id]
			);

		Logger::write(Logger::$ACTION_URL_DELETE, $array);

		$this->jsonSuccess();
	}

	public function ajaxCreate ()
	{
		$data = [
			'title' => Util::sanitize($_POST['title']),
			'iframe_conversion' => Util::sanitize($_POST['iframe_conversion'], null),
			'iframe_lead' => Util::sanitize($_POST['iframe_lead'], null),
			'affiliate_id' => $this->affiliate_id,
			'created' => time(),
			'offer_id' => 1 // todo hardcode
		];

		if (mb_strlen($data['title']) < 3)
		{
			$this->jsonErrorData(['title' => 'The title is too short.']);
		}

		DB::getInstance()
			->insert(
				TBL_AFFILIATE_URL, $data
			);

		Logger::write(Logger::$ACTION_URL_CREATE, $data);

		$this->jsonSuccess();
	}
}