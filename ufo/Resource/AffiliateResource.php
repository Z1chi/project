<?php
declare(strict_types=1);

namespace Ufo\Resource;

use Ufo\Model\Affiliate;

final class AffiliateResource
{
    public static function toArray(Affiliate $affiliate): array
    {
        $attributes = $affiliate->getAttributes();
        unset(
            // todo remove and replace with uid $attributes['id'],
            $attributes['project_id'],
            $attributes['parent_id'],
            $attributes['password'],
            $attributes['team_account'],
        );

        return $attributes;
    }
}
