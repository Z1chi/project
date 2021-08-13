<?php

namespace admin\view;

use admin\component\Logger;
use admin\model\Admin;
use admin\model\Call;
use admin\component\Pagination;
use affiliate\model\Withdraw;
use app\view\WalletView;
use system\components\DB;
use system\components\Url;
use system\core\AdminController;

class AffiliatewithdrawView extends AdminController
{
	private $filters = [
		'new' => ['title' => 'Новые'],
		'all' => ['title' => 'Все']
	];

	private $current_filter;
	private $filters_list;
	private $default_filter = 'reserved';

	/**
	 * @var Pagination
	 */
	private $pagination;

	public function init ()
	{
		if (Admin::getLevel() < Admin::$LEVEL_SUPERUSER) {
			$this->show404();
		}

		$this->filters_list = $this->initFiltersList();
		$this->current_filter = $this->initCurrentFilter();
	}

	public function indexAction()
    {
	    $this->setMetaTitle('Запросы на вывод');

		$this->pagination = new Pagination(KEY_ON_PAGE_COUNT);

    	$withdraw_count = $this->getWithdrawCount();
    	$this->pagination->setItemsCount($withdraw_count);

		$withdraw = $this->getWithdrawList();

		$pages = $this->pagination->getPaginationHtml(MODULE_TEMPLATE . '/pagination.php');

    	$this->pushTemplateData([
    		'LIST' => $withdraw,
			'FILTERS' => $this->filters_list,
			'FILTER' => $this->current_filter,
			'PAGES' => $pages
		]);
    }

	public function initCurrentFilter ()
	{
		$filter = $this->default_filter;

		if (isset($_GET['filter']))
		{
			if (isset($this->filters_list[$_GET['filter']])) {
				$filter = $_GET['filter'];
			}
		}

		return $filter;
	}

	public function initFiltersList ()
	{
		$filters_list = $this->filters;

		foreach ($filters_list as $key => $filter) {
			$filters_list[$key]['url'] = Url::createRaw('/affiliatewithdraw/?filter=' . $key);
		}

		return $filters_list;
	}

	public function getWithdrawCount ()
	{
		$q = 'SELECT COUNT(id) FROM ' . TBL_AFFILIATE_WITHDRAW . ' WHERE 1=1';

		// todo: refactor
		if ($this->current_filter == 'new') {
			$q .= 'AND status = ' . Withdraw::$STATUS_NEW;
		}

		$row = DB::getInstance()
			->row($q);

		return $row == NULL ? 0 : $row['count'];
	}

	public function getWithdrawList ()
	{
		$q = 'SELECT w.*, a.first_name, a.last_name FROM ' . TBL_AFFILIATE_WITHDRAW .' w
		LEFT JOIN "' . TBL_AFFILIATE . '" a ON w.affiliate_id = a.id ';

		$q .= ' WHERE 1=1 ';

		// todo: refactor
		if ($this->current_filter == 'new') {
			$q .= 'AND status = ' . Withdraw::$STATUS_NEW . ' ';
		}

		$q .=
			'ORDER BY created DESC, id ASC ' .
			'LIMIT ' . $this->pagination->getItemsOnPage() . ' ' .
			'OFFSET ' . $this->pagination->getOffset();

		$list = DB::getInstance()
			->run($q);

		$withdraw_list = [];

		foreach ($list as $k => $row)
		{
			$withdraw = Withdraw::withRow($row);
			$withdraw_list[] = $withdraw;
		}

		return $withdraw_list;
	}

	public function ajaxCloserequest ()
	{
		if (Admin::getLevel() < Admin::$LEVEL_SUPERUSER) {
			$this->jsonError();
		}

		$id = (int) $_POST['id'];

		$data = ['status' => Withdraw::$STATUS_OK];
		$conditions = ['id' => $id];

		$withdraw_user = DB::getInstance()->row('SELECT * FROM ' . TBL_AFFILIATE_WITHDRAW . ' WHERE id = ?', $id);

		DB::getInstance()->update(TBL_AFFILIATE_WITHDRAW, $data, $conditions);

		DB::getInstance()
			->query(
				'UPDATE "' . TBL_AFFILIATE . '" ' .
				'SET total_withdraw_btc = total_withdraw_btc + ' . $withdraw_user['amount_btc'] . ' ' .
				'WHERE id = ' . $withdraw_user['affiliate_id']);

		$log = array_merge($conditions, $data);

		Logger::write(Logger::$ACTION_AFFILIATE_WITHDRAW_REQUEST_CLOSE, $log);

		$this->jsonSuccessData(['status' => 'Закрыт']);
	}
}