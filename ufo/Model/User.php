<?php
declare(strict_types=1);

namespace Ufo\Model;

use Ufo\Component\Eloquent\Eloquent;

/**
 * @property int       id
 * @property string    name
 * @property string    email
 * @property string    password
 * @property \DateTime created
 * @property \DateTime updated
 * @property int       level
 * @property int       callcenter_percent
 * @property ?int      activity
 * @property bool      active
 * @property ?int      callcenter_id
 */
final class User extends Eloquent
{
    protected $table = 'user';

    /**
     * The name of the "created at" column.
     *
     * @var string|null
     */
    const CREATED_AT = 'created';

    /**
     * The name of the "updated at" column.
     *
     * @var string|null
     */
    const UPDATED_AT = 'updated';

    public function getId(): int
    {
        return $this->id;
    }
}
