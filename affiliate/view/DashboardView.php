<?php

namespace affiliate\view;

use App;
use app\component\NumbersHelper;
use system\components\DB;
use system\core\AffiliateController;
use Ufo\Service\AffiliateActionLogService;

class DashboardView extends AffiliateController
{
	public $authorizationRequired = true;

	public function init()
	{

	}

	public function indexAction()
	{
		$affiliate_id = $_SESSION[SESSION_KEY_CURRENT]['id'];

		$affiliate = DB::getInstance()
			->row('SELECT * FROM "' . TBL_AFFILIATE .'" WHERE id = ?', $affiliate_id);

//		$leads = LeadsCollection::getList($affiliate_id, null, 10);
		$actions = (new AffiliateActionLogService())->getActions($affiliate_id, null, null, 10);

		$balance_btc = NumbersHelper::formatBtcToOutput($affiliate['balance_btc']);
		$total_income_btc = NumbersHelper::formatBtcToOutput($affiliate['total_income_btc']);
		$total_turnover_btc = NumbersHelper::formatBtcToOutput($affiliate['total_turnover_btc']);

		$balance_eur = NumbersHelper::formatEur($affiliate['balance_eur']);
		$total_income_eur = NumbersHelper::formatEur($affiliate['total_income_eur']);
		$total_turnover_eur = NumbersHelper::formatEur($affiliate['total_turnover_eur']);

		$data = [
			'BALANCE_BTC' => $balance_btc,
			'BALANCE_EUR' => $balance_eur,
			'INCOME_BTC' => $total_income_btc,
			'INCOME_EUR' => $total_income_eur,
			'TURNOVER_BTC' => $total_turnover_btc,
			'TURNOVER_EUR' => $total_turnover_eur,
//			'LEADS' => $leads,
			'ACTIONS' => $actions
		];

		$this->pushTemplateData($data);
	}
}