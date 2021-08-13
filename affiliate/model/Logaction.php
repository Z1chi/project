<?php


namespace affiliate\model;

use app\component\HashidHelper;
use system\core\Model;
use \app\controller\Affiliate;

class Logaction extends Model
{
	private $affiliate_id;
	private $url_id;
	private $action;
	private $user_id;
	private $deposit;
	private $currency;
	private $geo;
	private $payout;
	private $created;
    private $id;
    private $user_uid;

	public static function withRow ($row)
	{
		$instance = new self();
		$instance->fill($row);
		return $instance;
	}

	private function fill( array $row )
	{
		$this->id = $row['id'];
		$this->affiliate_id = $row['affiliate_id'];
		$this->url_id = $row['url_id'];
		$this->action = $row['action'];
		$this->user_id = $row['user_id'];
		$this->deposit = $row['deposit'];
		$this->currency = $row['currency'];
		$this->geo = $row['geo'];
		$this->payout = $row['payout'];
        $this->created = $row['created'];
        $this->user_uid = $row['user_uid'];
	}

	/**
	 * @return int
	 */
	public function getId()
	{
		return $this->id;
	}

	/**
	 * @return mixed
	 */
	public function getAffiliateId()
	{
		return $this->affiliate_id;
	}

	/**
	 * @return mixed
	 */
	public function getUrlId()
	{
		return $this->url_id;
	}

	/**
	 * @return int
	 */
	public function getAction()
	{
		return $this->action;
	}

	/**
	 * @return mixed
	 */
	public function getActionString()
	{
		switch ($this->action) {
			case Affiliate::ACTION_CLICK:
				return 'Click';
				break;
			case Affiliate::ACTION_SIGNUP:
				return '<span class="text-orange">Sign up</span>';
				break;
			case Affiliate::ACTION_DEPOSIT:
				return '<strong class="text-green">Deposit</strong>';
				break;
		}

		return '';
	}

	/**
	 * @return int
	 */
	public function getUserId()
	{
		return $this->user_id;
	}

	/**
	 * @return string
	 */
	public function getUserUid()
	{
		return $this->user_uid;
	}

	/**
	 * @return float
	 */
	public function getDeposit()
	{
		return $this->deposit;
	}

	/**
	 * @return string
	 */
	public function getCurrency()
	{
		return $this->currency;
	}

	/**
	 * @return string
	 */
	public function getGeo ()
	{
		$geo = $this->geo;

		if ($geo == '') {
			$geo = 'Unknown';
		}

		return $geo;
	}

	/**
	 * @return float
	 */
	public function getPayout()
	{
		return $this->payout;
	}

	/**
	 * @return string
	 */
	public function getCreatedFormatted ()
	{
		return date('d.m.Y, H:i', $this->created);
	}
}