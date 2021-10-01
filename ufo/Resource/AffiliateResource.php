<?php
declare(strict_types=1);

namespace Ufo\Resource;

use Ufo\Model\Affiliate;
use Ufo\Model\Project;

final class AffiliateResource
{
    public static function toArray(Affiliate $affiliate): array
    {
        $attributes = $affiliate->getAttributes();

        $isNotTrustedProject = !Project::find($attributes['project_id'])->is_trusted;
        if($isNotTrustedProject) {
            unset(
                $attributes['first_name'],
                $attributes['last_name']
            );
        }

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
