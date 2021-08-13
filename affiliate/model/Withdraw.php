<?php

namespace affiliate\model;


use system\components\DB;
use system\core\Model;

class Withdraw extends Model
{
	public static $STATUS_NEW = 1;
	public static $STATUS_OK = 2; // todo: send to addr & update total_withdraw_btc
	public static $STATUS_DECLINED = 3; // todo: move back to account
	public static $STATUS_CANCELED = 4; // todo: move back to account

	private $id;
	private $btc_address;
	private $amount_btc;
	private $affiliate_id;

	private $status;
	private $created;
	private $full_name;
	private $account_status;

	public static function withRow ($row = [])
	{
		$instance = new self();

		$instance->id = $row['id'];
		$instance->btc_address = $row['btc_address'];
		$instance->amount_btc = $row['amount_btc'];
		$instance->affiliate_id = $row['affiliate_id'];
		$instance->full_name = $row['first_name'] . ' ' . $row['last_name'];

		$instance->status = $row['status'];
		$instance->created = $row['created'];

		return $instance;
	}

	public function getId ()
	{
		return $this->id;
	}

	/**
	 * @return mixed
	 */
	public function getBtcAddress()
	{
		return $this->btc_address;
	}

	/**
	 * @return mixed
	 */
	public function getAmountBtc()
	{
		return $this->amount_btc;
	}

	/**
	 * @return mixed
	 */
	public function getStatus()
	{
		return $this->status;
	}

	/**
	 * @return mixed
	 */
	public function getStatusString()
	{
		switch ($this->status) {
			case self::$STATUS_NEW:
				return 'New';
				break;
			case self::$STATUS_OK:
				return 'Closed';
				break;
		}
	}

	public function isStatusOk()
	{
		return $this->status == self::$STATUS_OK;
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
	public function getUserAccountStatus()
	{
		return $this->account_status;
	}

	/**
	 * @return mixed
	 */
	public function getCreated()
	{
		return $this->created;
	}

	public function getCreatedFormatted ()
	{
		return date('d.m.Y, H:i', $this->created);
	}

	/**
	 * @return string
	 */
	public function getFullName()
	{
		return $this->full_name;
	}
}