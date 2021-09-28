<?php
declare(strict_types=1);

namespace Ufo\Model;

use Ufo\Component\Eloquent\Eloquent;

/**
 * @property int       id
 * @property string    name
 * @property string    image
 * @property string    tg_link
 * @property int    active
 * @property null|\DateTimeImmutable created_at
 * @property null|\DateTimeImmutable updated_at
 */
final class Support extends Eloquent
{
    protected $table = 'support';
}
