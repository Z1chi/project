<?php
declare(strict_types=1);

namespace Ufo\Model;

use app\controller\Affiliate;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Ufo\Component\Eloquent\Eloquent;

/**
 * @property string token
 * @property \DateTime created_at
 * @property \DateTime updated_at
 * @property int affiliate_id
 *
 * @property Affiliate affiliate
 */
class RecoveryToken extends Eloquent
{
    protected $table = 'recovery_token';

    /**
     * The name of the "created at" column.
     *
     * @var string|null
     */
    const CREATED_AT = 'created_at';

    /**
     * The name of the "updated at" column.
     *
     * @var string|null
     */
    const UPDATED_AT = 'created_at';

    public function affiliate(): BelongsTo
    {
        return $this->belongsTo(\Ufo\Model\Affiliate::class, 'affiliate_id');
    }
}