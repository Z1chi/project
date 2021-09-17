<?php
declare(strict_types=1);

namespace Ufo\Service;

use admin\component\Pagination;
use app\component\HashidHelper;
use Illuminate\Database\Eloquent\Collection;
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

    /**
     * @param int $affiliate_id
     * @param Pagination|null $pagination
     * @return Collection
     */
    public function getSmartlinksList (int $affiliate_id, Pagination $pagination = null): Collection
    {
        $q = AffiliateUrl::where([['deleted', 0],['affiliate_id', $affiliate_id]])
            ->orderBy('id', 'DESC')
            ->limit($pagination->getItemsOnPage())
            ->offset($pagination->getOffset())
            ->get();

        return $q;
    }
}
