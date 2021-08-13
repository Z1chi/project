<?php
declare(strict_types=1);

namespace Ufo\Service;

use app\component\HashidHelper;
use Ufo\Exception\AffiliateServiceException;
use Ufo\Model\Affiliate;
use Ufo\Model\AffiliateUrl;
use Ufo\Model\Project;

final class AffiliateUrlService
{
    /**
     * @param int $affiliateUrlId
     * @return AffiliateUrl
     * @throws AffiliateServiceException
     */
    public function getUrlById(int $affiliateUrlId): AffiliateUrl
    {
        $affiliateUrl = AffiliateUrl::where('id', $affiliateUrlId)->first();
        if (!$affiliateUrl) {
            throw new AffiliateServiceException(sprintf('Link #%d not found', $affiliateUrlId));
        }

        return $affiliateUrl;
    }

    /**
     * @param string $smartLink
     * @return AffiliateUrl
     * @throws AffiliateServiceException
     */
    public function getLinkBySmartlink(string $smartLink): AffiliateUrl
    {
        $urlId = HashidHelper::decodeSmartlinkId($smartLink);
        $affiliateUrl = AffiliateUrl::find($urlId);
        if (!$affiliateUrl) {
            throw new AffiliateServiceException(sprintf('Link #%d not found', $urlId));
        }

        return $affiliateUrl;
    }

    public function getLinkByUrlId(int $urlId): AffiliateUrl
    {
        $affiliateUrl = AffiliateUrl::find($urlId);
        if (!$affiliateUrl) {
            throw new AffiliateServiceException(sprintf('Link #%d not found', $urlId));
        }

        return $affiliateUrl;
    }
}
