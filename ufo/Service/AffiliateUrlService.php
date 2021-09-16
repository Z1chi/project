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

    public static function getSmartlinksList ($affiliate_id, $pagination = null)
    {
        $q = AffiliateUrl::where([['deleted', 0],['affiliate_id', $affiliate_id]])
            ->orderBy('id', 'DESC')
            ->limit($pagination->getItemsOnPage())
            ->offset($pagination->getOffset())
            ->get();

        foreach ($q as $row)
        {
            $row->formattedUrl = getenv('APP_SCHEME') . '://' . getenv('APP_HOSTNAME') . '/?' . AFFILIATE_URL_GET_KEY . '=' . HashidHelper::encodeSmartlinkId($row->id);
            $row->created = self::getFormatted($row->created);
        }

        return $q;
    }

    public static function getFormatted ($timestamp, $format = 'd.m.Y, H:i')
    {
        return date('d.m.Y, H:i', $timestamp);
    }
}
