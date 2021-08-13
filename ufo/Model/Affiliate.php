<?php
declare(strict_types=1);

namespace Ufo\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Ufo\Component\Eloquent\Eloquent;

/**
 * @property int id
 * @property null|int project_id
 * @property null|int user_uid
 * @property string first_name
 * @property string last_name
 * @property string email
 * @property string telegram
 * @property string password
 * @property int activity
 * @property int created
 * @property int updated
 * @property string active
 * @property float balance_btc
 * @property float total_income_btc
 * @property int refshare_percent
 * @property string postback_url
 * @property float balance_eur
 * @property float total_income_eur
 * @property float total_turnover_btc
 * @property float total_turnover_eur
 * @property int first_deposit_percent
 * @property int parent_id
 * @property int team_count
 * @property float total_withdraw_btc
 */
final class Affiliate extends Eloquent
{
    protected $table = 'affiliate';
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

    public function getProjectId(): int
    {
        return $this->project_id;
    }

    public function getUserUid(): ?string
    {
        return $this->user_uid;
    }

    public function affiliate(): BelongsTo
    {
        return $this->belongsTo(Affiliate::class, 'affiliate_id');
    }
}
