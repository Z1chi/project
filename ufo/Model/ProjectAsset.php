<?php
declare(strict_types=1);

namespace Ufo\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Ufo\Component\Eloquent\Eloquent;

/**
 * @property int       id
 * @property string    file
 * @property string    preview
 * @property int    project_id
 * @property int    category
 * @property \DateTime created_at
 */
class ProjectAsset extends Eloquent
{
    protected $table = 'project_asset';

    protected $casts = [
        'created_at' => 'datetime',
    ];

    protected $guarded = [
        'id'
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_id');
    }
}