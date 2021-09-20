<?php
declare(strict_types=1);

namespace Ufo\Model;

use app\controller\Affiliate;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Ufo\Component\Eloquent\Eloquent;
use Ufo\ValueObject\PayoutType;

/**
 * @property int          id
 *
 * @property int project_id
 * @property float deposit
 * @property string currency
 * @property int affiliate_id
 * @property int action
 * @property string geo
 * @property int created
 *
 * @property int url_id
 *
 * @property string transaction_id
 * @property string payout_type
 * @property float payout_value
 * @property float payout_amount
 * @property string payout_currency
 * @property string payout
 *
 * @property string user_uid
 * @property int user_id
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

    public function save(array $options = [])
    {
        if (!$this->project_id) { // todo remove
            $this->project_id = 1;
        }
        if (!$this->id && $this->deposit && PayoutType::PERCENT === $this->payout_type) { // todo move to service
            $this->payout_amount = $this->deposit / 100 * $this->payout_value;
            $this->payout_currency = $this->currency;
        }

        return parent::save($options); // TODO: Change the autogenerated stub
    }
}
