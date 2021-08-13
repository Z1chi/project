<?php
declare(strict_types=1);

namespace Ufo\Resource;

use app\component\HashidHelper;
use Ufo\Model\AffiliateUrl;

final class AffiliateUrlResource
{
    public static function toArray(AffiliateUrl $affiliateUrl): array
    {
        $attributes = $affiliateUrl->getAttributes();
        $attributes['smart_link'] = HashidHelper::encodeSmartlinkId($attributes['id']);
        unset(
            // todo remove and replace with uid $attributes['id'],
            $attributes['affiliate_id'],
            $attributes['offer_id'],
            $attributes['deleted'],
        );

        return $attributes;
    }
}
