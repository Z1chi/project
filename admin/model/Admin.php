<?php

namespace admin\model;

use admin\component\Logger;
use system\components\DB;
use system\core\Model;
use system\exceptions\RequestException;

class Admin extends Model
{
	public static $LEVEL_CALL_CENTER_WORKER = 0;
	public static $LEVEL_CALL_CENTER_SUPERVISOR = 10;
	public static $LEVEL_SUPERUSER = 20;

    private $id;
    private $email;
    private $name;
    private $active;
    private $created;
    private $activity;
    private $callcenter_percent;
    private $callcenter_id;
    private int $shiftCount;

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
        $this->name = $row['name'];
        $this->active = $row['active'];
        $this->created = $row['created'];
        $this->active = $row['active'];
        $this->activity = $row['activity'];
        $this->callcenter_percent = $row['callcenter_percent'];
        $this->callcenter_id = $row['callcenter_id'];
        $this->shiftCount = $row['shift_count'] ?? 0;
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
     * @return mixed
     */
    public function getFullName()
    {
        return $this->name;
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

    /**
     * @return integer
     */
    public function getCallcenterPercent()
    {
        return $this->callcenter_percent;
    }

    /**
     * @return mixed
     */
    public function isActive()
    {
        return $this->active == 1;
    }

    /**
     * @return integer
     */
    public function getCallcenterId()
    {
        return $this->callcenter_id;
    }

    public function getShiftCount(): int
    {
        return $this->shiftCount;
    }

    public static function getAdminById ($admin_id)
    {
        $q = 'SELECT * FROM "' . TBL_ADMIN . '" WHERE id = ?';
        $row = DB::getInstance()->row($q, $admin_id);

        return self::withRow($row);
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
            ->update(TBL_ADMIN,
                ['activity' => time()],
                ['id' => $id]
            );
    }

    public static function signIn($email, $password)
    {
        if (empty($email) || empty($password)) {
            throw new RequestException();
        }

        $row = DB::getInstance()
			->row('SELECT id, name, email, password, level, callcenter_percent FROM "' . TBL_ADMIN . '" 
			WHERE email = ? AND active = 1', $email);

        if (!$row || !password_verify($password, $row['password'])) {
            throw new RequestException('Incorrect login');
        }

        $_SESSION[SESSION_KEY_CURRENT] = [
            'id'    => $row['id'],
            'email' => $row['email'],
            'name'  => $row['name'],
            'time'  => time(),
	        'level' => $row['level']
        ];

        return true;
    }

    public static function logOut($timeout = false)
    {
        if (self::isSigned()) {

			Logger::write(Logger::$ACTION_LOGOUT);

            unset($_SESSION[SESSION_KEY_CURRENT]);
        }
    }

    public static function getCurrentId ()
	{
		return $_SESSION[SESSION_KEY_CURRENT]['id'];
	}

    public static function getLevel ()
    {
    	return $_SESSION[SESSION_KEY_CURRENT]['level'];
    }

    public static function isExists ($email)
    {
        $email = mb_strtolower($email);
        return DB::getInstance()->row('SELECT id FROM "' . TBL_ADMIN . '" WHERE lower(email) = ?', $email);
    }
}