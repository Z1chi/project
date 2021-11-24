<?php

namespace affiliate\model;

use affiliate\component\Logger;
use system\components\DB;
use system\core\Model;
use system\exceptions\RequestException;

/**
 * @property int id;
 */
class Affiliate extends Model
{
	private $id;
	private $email;
	private $telegram;
	private $first_name;
	private $last_name;
	private $balance_btc;
	private $total_income_btc;
	private $total_turnover_btc;
	private $revshare_percent;
	private $first_deposit_percent;
	private $active;
	private $created;
	private $activity;

	public static function withRow ($row)
	{
		$instance = new self();
		$instance->fill($row);
		return $instance;
	}

	private function fill( array $row )
	{
		$this->id = $row['id'];
		$this->email = $row['email'];
		$this->telegram = $row['telegram'];
		$this->first_name = $row['first_name'];
		$this->last_name = $row['last_name'];
		$this->balance_btc = $row['balance_btc'];
		$this->total_income_btc = $row['total_income_btc'];
		$this->total_turnover_btc = $row['total_turnover_btc'];
		$this->revshare_percent = $row['revshare_percent'];
		$this->first_deposit_percent = $row['first_deposit_percent'];
		$this->active = $row['active'];
		$this->created = $row['created'];
		$this->activity = $row['activity'];
	}

	/**
	 * @return int
	 */
	public function getId()
	{
		return $this->id;
	}

	/**
	 * @return string
	 */
	public function getEmail()
	{
		return $this->email;
	}

	/**
	 * @return string
	 */
	public function getTelegram()
	{
		return $this->telegram;
	}

	/**
	 * @return string
	 */
	public function getFirstName()
	{
		return $this->first_name;
	}

	/**
	 * @return string
	 */
	public function getLastName()
	{
		return $this->last_name;
	}

	/**
	 * @return mixed
	 */
	public function getFullName()
	{
		return $this->first_name . ' ' . $this->last_name;
	}

	/**
	 * @return float
	 */
	public function getBalanceBtc()
	{
		return $this->balance_btc;
	}

	/**
	 * @return float
	 */
	public function getTotalIncomeBtc()
	{
		return $this->total_income_btc;
	}

	/**
	 * @return float
	 */
	public function getTotalTurnoverBtc()
	{
		return $this->total_turnover_btc;
	}

	/**
	 * @return int
	 */
	public function getRevsharePercent()
	{
		return $this->revshare_percent;
	}

	/**
	 * @return int
	 */
	public function getFirstDepositPercent()
	{
		return $this->first_deposit_percent;
	}

	/**
	 * @return int
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
	 * @return int
	 */
	public function getActivity()
	{
		return $this->activity;
	}

	public function getActivityFormatted ()
	{
		if ($this->activity == null) {
			return null;
		}
		return date('d.m.Y, H:i', $this->activity);
	}

	public static function isSigned()
	{
		if (!empty($_SESSION[SESSION_KEY_CURRENT])) {
			self::updateActivity($_SESSION[SESSION_KEY_CURRENT]['id']);
			return true;
		}

		return false;
	}

	public static function updateActivity ($id)
	{
		DB::getInstance()
			->update(TBL_AFFILIATE,
				['activity' => time()],
				['id' => $id]
			);
	}

    public static function signIn($email, $password)
    {
        if (empty($email) || empty($password)) {
            throw new RequestException();
        }

        $row = \Ufo\Model\Affiliate::where('email', $email)->first();

        if (!$row || !password_verify($password, $row['password'])) {
            throw new RequestException('Incorrect login');
        }

	    if ($row['active'] == 0) {
		    throw new RequestException('Account is not activated');
	    }

        self::setSession($row);

        return true;
    }

    public static function setSession ($row)
    {
	    $_SESSION[SESSION_KEY_AFFILIATE] = [
		    'name' => $row['first_name'] . ' ' . $row['last_name'],
		    'id'    => $row['id'],
		    'email' => $row['email'],
		    'parent_id' => $row['parent_id'],
		    'first_deposit_percent' => $row['first_deposit_percent'],
		    'revshare_percent' => $row['revshare_percent'],
		    'time'  => time(),
            'support_tg_link' => $row->support->tg_link,
            'support_image' => $row->support->image
	    ];
    }

    public static function logOut($timeout = false)
    {
        if (self::isSigned()) {

			Logger::write(Logger::$ACTION_LOGOUT);

            unset($_SESSION[SESSION_KEY_CURRENT]);
        }
    }

    public static function changePassword($old_password, $new_password, $new_password_rep)
    {
        if (!self::isSigned()) {
            throw new RequestException();
        }

        if (empty($old_password) || empty($new_password) || empty($new_password_rep)) {
            throw new RequestException('Пожалуйста, заполните все поля');
        }

        $id = $_SESSION[SESSION_KEY_CURRENT]['id'];

        $query = DB::getInstance()->table(TBL_AFFILIATES)->select('*')->where('id', '=', $id);
        $affiliate = $query->first();

        if (!password_verify($old_password, $affiliate->password)) {
            throw new RequestException('Неправильный пароль');
        }

        if (strlen($new_password) < 8) {
            throw new RequestException('Длина нового пароля должна быть не менее 8 символов');
        }

        if ($new_password != $new_password_rep) {
            throw new RequestException('Пароли не совпадают');
        }

        DB::getInstance()
            ->table(TBL_AFFILIATES)
            ->where('id', (int) $id)
            ->update([ 'password' => password_hash($new_password, PASSWORD_BCRYPT) ]);

		Logger::write(Logger::$ACTION_CHANGE_PASSWORD);
    }

	/**
	 * @return mixed
	 */
	public function isActive()
	{
		return $this->active == 1;
	}
}