<?php
declare(strict_types=1);

namespace Ufo\Model;

use Ufo\Component\Eloquent\Eloquent;

/**
 * @property int       id
 * @property string    title
 * @property string    token
 * @property string    url_pattern
 * @property \DateTime created_at
 * @property \DateTime updated_at
 * @property \DateTime accessed_at
 * @property bool      is_trusted
 * @property string img
 */
final class Project extends Eloquent
{
    protected $table = 'project';

    protected $casts = [
        'accessed_at' => 'datetime',
    ];

    /**
     * Get host from url_pattern field
     * @return string
     */
    public function getUrlHost(): string
    {
        if(empty($this->url_pattern)) {
            return '';
        }

        return parse_url($this->url_pattern, PHP_URL_HOST);
    }

}
