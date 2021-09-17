<?php
declare(strict_types=1);

namespace Ufo\Model;

use app\component\HashidHelper;
use Google\Service\CloudSearch\Resource\Debug;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Ufo\Component\Eloquent\Eloquent;
use Ufo\Model\Project;

/**
 * @property int id
 * @property string title
 * @property int affiliate_id
 * @property int project_id
 * @property int created
 * @property int updated
 * @property null|\DateTimeImmutable createdAt
 * @property null|\DateTimeImmutable updatedAt
 * @property null|string iframe_conversion
 * @property null|string iframe_lead
 * @property Affiliate affiliate
 * @property Project project
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

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function getCreatedAtAttribute(): ?\DateTimeImmutable
    {
        $dateTime = (new \DateTimeImmutable())->setTimestamp($this->created);

        return $dateTime ?: null;
    }

    public function getUpdatedAtAttribute(): ?\DateTimeImmutable
    {
        $dateTime = (new \DateTimeImmutable())->setTimestamp($this->updated);

        return $dateTime ?: null;
    }

    public function getFullUrl(): string
    {
        return getenv('APP_SCHEME') . '://' . getenv('APP_HOSTNAME') . '/?' . AFFILIATE_URL_GET_KEY . '=' . HashidHelper::encodeSmartlinkId($this->id);
    }

    public function getUrlByPattern(): string
    {
        return sprintf($this->project->url_pattern, HashidHelper::encodeSmartlinkId($this->affiliate->user_uid));
    }
}
