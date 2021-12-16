<?php
declare(strict_types=1);

namespace Ufo\Model;

use DateTime;
use Ufo\Component\Eloquent\Eloquent;

/**
 * @property int       id
 * @property int       admin_id
 * @property string    action
 * @property string    data
 * @property string    ip
 * @property DateTime created_at
 */
final class LogAdmin extends Eloquent
{
    protected $table = 'log_admin';

    protected $fillable = [
        'admin_id',
        'action',
        'data',
        'ip'
    ];


    /**
     * The name of the "updated at" column.
     *
     * @var string|null
     */
    const UPDATED_AT = null;

}
