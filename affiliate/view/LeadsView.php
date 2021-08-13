<?php

namespace affiliate\view;


use admin\component\Pagination;
use affiliate\collection\LeadsCollection;
use App;
use app\collection\Miners;
use app\component\HashidHelper;
use app\model\User;
use system\components\DB;
use system\components\Url;
use system\core\AffiliateController;

class LeadsView extends AffiliateController
{
	public $authorizationRequired = true;

	/**
	 * @var Pagination
	 */
	private $pagination;
	private $id;
	private $affiliate_id;

	public function init()
	{
		$this->affiliate_id = $_SESSION[SESSION_KEY_CURRENT]['id'];

		$encoded = App::getCurrentUrl()->query->get('id');
		$encoded = preg_replace('~^(' . getenv('HASHID_USER_PREFIX') . ')~', '', $encoded);

		if ($encoded)
		{
			$this->id = HashidHelper::decodeUserId($encoded);
		}
	}

	public function indexAction()
	{
		if ($this->id == NULL) {
			$this->showList();
		} else {
			$this->showInfo($this->id);
		}
	}

	public function showList ()
	{
		$this->pagination = new Pagination(KEY_ON_PAGE_COUNT);

		$leads_count = LeadsCollection::getLeadsCount($this->affiliate_id);
		$this->pagination->setItemsCount($leads_count);

		$leads = LeadsCollection::getList($this->affiliate_id, $this->pagination);

		$pages = $this->pagination->getPaginationHtml(MODULE_TEMPLATE . '/pagination.php');

		$this->pushTemplateData([
			'LIST' => $leads,
			'PAGES' => $pages
		]);
	}

	private function showInfo($id)
	{
		$this->setTemplate('info');

		$q = 'SELECT * FROM "' . TBL_USER . '" WHERE id = ? AND affiliate_id = ' . $this->affiliate_id;
		$row = DB::getInstance()->row($q, $id);

		if (!$row) {
			header('Location: ' . Url::createRaw('/leads'));
			exit;
		}

		$user = User::withRow($row);
		$user_miners = Miners::getList($user->getId());

		$user_payment_q = 'SELECT * FROM "' . TBL_LOG_USER . '" WHERE user_id = ? AND action = ? ORDER BY created DESC';
		$user_payments = DB::getInstance()
			->run($user_payment_q, $id, \app\component\Logger::$ACTION_MINER_PAYMENT);

		foreach ($user_payments as $k => $payment) {

			$sum_json = json_decode($payment['data']);

			$user_payments[$k]['data'] = $sum_json->sum . ' ' . $sum_json->currency;
		}

		$this->pushTemplateData([
			'USER' => $user,
			'MINERS' => $user_miners,
			'LOGS' => $user_payments
		]);
	}
}