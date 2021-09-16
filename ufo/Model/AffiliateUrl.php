<?php
declare(strict_types=1);

namespace Ufo\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Ufo\Component\Eloquent\Eloquent;

/**
 * @property int id
 * @property string title
 * @property int affiliate_id
 * @property int project_id
 * @property int created
 * @property int updated
 * @property null|string iframe_conversion
 * @property null|string iframe_lead
 * @property Affiliate affiliate
 */
final class AffiliateUrl extends Eloquent
{
    protected $table = 'affiliate_url';
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
}
