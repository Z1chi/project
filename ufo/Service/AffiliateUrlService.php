<?php
declare(strict_types=1);

namespace Ufo\Service;

use admin\component\Pagination;
use app\component\HashidHelper;
use Illuminate\Database\Eloquent\Collection;
use Ufo\Exception\AffiliateServiceException;
use Ufo\Model\AffiliateUrl;

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
            throw new AffiliateServiceException(sprintf('Affiliate url id #%d not found', $affiliateUrlId));
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
            throw new AffiliateServiceException(sprintf('Url id from smart link #%d not found', $urlId));
        }

        return $affiliateUrl;
    }

    public function getLinkByUrlId(int $urlId): AffiliateUrl
    {
        $affiliateUrl = AffiliateUrl::find($urlId);
        if (!$affiliateUrl) {
            throw new AffiliateServiceException(sprintf('Url id #%d not found', $urlId));
        }

        return $affiliateUrl;
    }

    /**
     * @param int $affiliateId
     * @param Pagination|null $pagination
     * @return Collection|AffiliateUrl[]
     */
    public function getSmartlinksList(int $affiliateId, Pagination $pagination = null): Collection
    {
        return AffiliateUrl::where([['deleted', 0],['affiliate_id', $affiliateId]])
            ->orderBy('id', 'DESC')
            ->limit($pagination->getItemsOnPage())
            ->offset($pagination->getOffset())
            ->get();
    }
}
