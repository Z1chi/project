<?php
declare(strict_types=1);

namespace Ufo\Model;

use admin\component\Logger;
use DateTime;
use system\exceptions\RequestException;
use Ufo\Component\Eloquent\Eloquent;

/**
 * @property int       id
 * @property string    name
 * @property string    email
 * @property string    password
 * @property DateTime  created_at
 * @property DateTime  updated_at
 * @property int       level
 * @property int       callcenter_percent
 * @property null|int  activity
 * @property bool      active
 * @property null|int  callcenter_id
 *
 * @method static self find(int $integer)
 */
final class Admin extends Eloquent implements AdminInterface
{
    public const LEVEL_CALL_CENTER_WORKER = 0;
    public const LEVEL_CALL_CENTER_SUPERVISOR = 10;
    public const LEVEL_SUPERUSER = 20;

    protected $table = 'admin';

    protected $fillable = [
        'name',
        'email',
        'level',
        'callcenter_percent',
        'activity',
        'active',
        'callcenter_id'
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function getCreatedFormatted (): string
    {
        return $this->created_at->format('d.m.Y, H:i');
    }

    public function getActivityFormatted()
    {
        if ($this->activity == null) {
            return null;
        }
        return date('d.m.Y, H:i', $this->activity);
    }

    public function getFullName(): string
    {
        return $this->name;
    }

    public function isActive(): bool
    {
        return $this->active == 1;
    }

    public static function isSigned(): bool
    {
        if (!empty($_SESSION[SESSION_KEY_CURRENT])) {
            self::updateActivity($_SESSION[SESSION_KEY_CURRENT]['id']);
            return true;
        }

        return false;
    }

    public static function updateActivity ($id)
    {
        Admin::updateById($id, ['activity' => time()]);
    }

    public static function signIn($email, $password): bool
    {
        if (empty($email) || empty($password)) {
            throw new RequestException();
        }

        $row = self::query()
            ->where('email', '=', $email)
            ->where('active', '=', 1)
            ->first(['id', 'name', 'email', 'password', 'level', 'callcenter_percent']);

        if (!$row || !password_verify($password, $row->password)) {
            throw new RequestException('Incorrect login');
        }

        $_SESSION[SESSION_KEY_CURRENT] = [
            'id'    => $row->id,
            'email' => $row->email,
            'name'  => $row->name,
            'time'  => time(),
            'level' => $row->level
        ];

        return true;
    }

    public static function logOut($timeout = false)
    {
        if (self::isSigned()) {

            Logger::write(Logger::ACTION_LOGOUT);

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

    public static function isMinLevel(int $level): bool {
        return self::getLevel() >= $level;
    }

    public static function isLevel(int $level): bool {
        return self::getLevel() === $level;
    }

    public static function isExists($email): bool
    {
        return self::query()->where('email', '=', mb_strtolower($email))->exists();
    }
}
