<?php
declare(strict_types=1);

namespace Ufo\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Ufo\Component\Eloquent\Eloquent;

/**
 * @property int          id
 *
 * @property Affiliate    affiliate
 * @property AffiliateUrl affiliateUrl
 */
final class AffiliateActionLog extends Eloquent
{
    protected $table = 'affiliate_action_log';
    public $timestamps = false;

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

    public function affiliate(): BelongsTo
    {
        return $this->belongsTo(Affiliate::class, 'affiliate_id');
    }

    public function affiliateUrl(): BelongsTo
    {
        return $this->belongsTo(AffiliateUrl::class, 'url_id');
    }
}
