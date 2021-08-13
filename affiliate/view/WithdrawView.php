<?php

namespace affiliate\view;


use affiliate\model\Withdraw;
use App;
use app\component\NumbersHelper;
use system\components\DB;
use system\components\Util;
use system\core\AffiliateController;

class WithdrawView extends AffiliateController
{
	public $authorizationRequired = true;
	private $balance_btc;
	private $affiliate;
	private $affiliate_id;

	public function init()
	{
		$this->affiliate_id = App::getSession('id');

		$this->affiliate = DB::getInstance()
			->row('SELECT * FROM "' . TBL_AFFILIATE .'" WHERE id = ?', $this->affiliate_id);

		$this->balance_btc = NumbersHelper::formatBtcToOutput($this->affiliate['balance_btc']);
	}

	public function indexAction()
	{
		$this->pushTemplateData([
			'BALANCE_BTC' => $this->balance_btc
		]);
	}

	public function ajaxRequest ()
	{
		if (!isset($_POST['amount'])) {
			$this->jsonErrorMsg('Fill all fields!');
		}

		$amount = (float) $_POST['amount'];

		if ($amount > $this->balance_btc) {
			$this->jsonErrorMsg('Insufficient funds');
		}

		if ($amount < WITHDRAW_MIN) {
			$this->jsonErrorMsg('Minimum withdrawal sum: <strong>' . WITHDRAW_MIN . '</strong> BTC');
		}

		// Withdraw btc

		$address = Util::sanitize($_POST['address']);

		if (!NumbersHelper::checkBtcAddress($address)) {
			$this->jsonErrorMsg('Incorrect bitcoin address');
		}

		if (!$amount || !$address) {
			$this->jsonErrorMsg('Fill all fields');
		}

		$data = [
			'affiliate_id' => $this->affiliate_id,
			'created' => time(),
			'amount_btc' => $amount,
			'btc_address' => $address,
			'status' => Withdraw::$STATUS_NEW
		];

		DB::getInstance()
			->insert(TBL_AFFILIATE_WITHDRAW, $data);

		DB::getInstance()
			->query('UPDATE "' . TBL_AFFILIATE . '" SET balance_btc = balance_btc - ' . $amount . ' WHERE id = ' . $this->affiliate_id);

		$this->jsonSuccessMsg('Request sent!');
	}
}