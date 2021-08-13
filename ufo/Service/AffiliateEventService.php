<?php
declare(strict_types=1);

namespace Ufo\Service;

use app\component\Browser;
use app\component\HashidHelper;
use system\components\DB;
use Ufo\Exception\AffiliateServiceException;
use Ufo\Model\Affiliate;
use Ufo\Model\AffiliateUrl;
use Ufo\ValueObject\AffiliateAction;

/**
 * @todo refactor!!!
 */
final class AffiliateEventService
{
    /**
     * @param string $smartlink
     * @param string|null $userUid
     * @param string $ip
     * @param string|null $geo
     * @param bool|null $isUnique
     * @param string|null $httpReferrer
     * @return AffiliateUrl
     * @throws AffiliateServiceException
     */
    public function logClick(
        string $smartlink,
        ?string $userUid,
        string $ip,
        ?string $geo,
        ?bool $isUnique,
        ?string $httpReferrer,
        ?\DateTimeImmutable $eventDateTime
    ): AffiliateUrl {
        $affiliateUrl = $this->findAffiliateUrlBySmartlink($smartlink);
        if (!$affiliateUrl) {
            throw new AffiliateServiceException('Url not found');
        }

        $data = [
            'affiliate_id' => $affiliateUrl->affiliate_id,
            'url_id' => $affiliateUrl->id,
            'user_uid' => $userUid,
            'offer_id' => 1,
            'action' => AffiliateAction::CLICK,
            'created' => time(),
            'ip' => $ip,
            'geo' => $geo,
            'unique' => null === $isUnique ? null : ($isUnique ? 1 : 0),
            'http_referrer' => $httpReferrer
        ];
        if ($eventDateTime) {
            $data['created_dt'] = $eventDateTime->format('Y-m-d');
            $data['created'] = $eventDateTime->getTimestamp();
        }

        DB::getInstance()->insert(TBL_AFFILIATE_ACTION_LOG, $data);

        return $affiliateUrl;
    }

    /**
     * @todo move to AffiliateUrlService
     * @param string $smartlink
     * @return AffiliateUrl|null
     */
    private function findAffiliateUrlBySmartlink(string $smartlink): ?AffiliateUrl
    {
        $id = HashidHelper::decodeSmartlinkId($smartlink);

        return AffiliateUrl::find($id);
    }

    private function findAffiliateUrlByUrlId(int $urlId): ?AffiliateUrl
    {
        return AffiliateUrl::find($urlId);
    }

    /**
     * @param string $smartlink
     * @param string $userUid
     * @param string $ip
     * @param string|null $geo
     * @return AffiliateUrl
     * @throws AffiliateServiceException
     */
    public function logSignup(string $smartlink, string $userUid, string $ip, ?string $geo): AffiliateUrl
    {
        $affiliateUrl = $this->findAffiliateUrlBySmartlink($smartlink);
        if (!$affiliateUrl) {
            throw new AffiliateServiceException('Url not found');
        }

        DB::getInstance()->insert(TBL_AFFILIATE_ACTION_LOG, [
            'affiliate_id' => $affiliateUrl->affiliate_id,
            'url_id' => $affiliateUrl->id,
            'user_uid' => $userUid,
            'offer_id' => 1, // todo what for???
            'action' => AffiliateAction::SIGNUP,
            'created' => time(),
            'ip' => $ip,
            'geo' => $geo
        ]);

        return $affiliateUrl;
    }

    /**
     * @param Affiliate $affiliate
     * @param string $smartlink
     * @param string $ip
     * @param string|null $geo
     * @param $deposit
     * @param $payout
     * @param $currency
     * @return AffiliateUrl|null
     * @throws AffiliateServiceException
     */
    public function logDepositBySmartlink(Affiliate $affiliate, string $smartlink, string $ip, ?string $geo, $deposit, $payout, $currency): ?AffiliateUrl
    {
        $affiliateUrl = $this->findAffiliateUrlBySmartlink($smartlink);
        if (!$affiliateUrl) {
            throw new AffiliateServiceException('Url by smartlink not found');
        }

        DB::getInstance()->insert(TBL_AFFILIATE_ACTION_LOG, [
            'affiliate_id' => $affiliate->getId(),
            'url_id' => $affiliateUrl->id,
            'user_uid' => $affiliate->getUserUid(),
            'offer_id' => 1,
            'action' => AffiliateAction::DEPOSIT,
            'created' => time(),
            'ip' => $ip,
            'geo' => $geo,
            'deposit' => $deposit,
            'currency' => mb_strtoupper($currency),
            'payout' => $payout
        ]);

        return $affiliateUrl;
    }

    public function logDepositByUrlId(Affiliate $affiliate, int $urlId, string $ip, ?string $geo, $deposit, $payout, $currency): ?AffiliateUrl
    {
        $affiliateUrl = $this->findAffiliateUrlByUrlId($urlId);
        if (!$affiliateUrl) {
            throw new AffiliateServiceException('Url by ID not found');
        }

        DB::getInstance()->insert(TBL_AFFILIATE_ACTION_LOG, [
            'affiliate_id' => $affiliate->getId(),
            'url_id' => $affiliateUrl->id,
            'user_uid' => $affiliate->getUserUid(),
            'offer_id' => 1,
            'action' => AffiliateAction::DEPOSIT,
            'created' => time(),
            'ip' => $ip,
            'geo' => $geo,
            'deposit' => $deposit,
            'currency' => mb_strtoupper($currency),
            'payout' => $payout
        ]);

        DB::getInstance()
            ->query(
                'UPDATE "' . TBL_AFFILIATE . '" ' .
                'SET ' .

                'balance_' . $currency . ' = balance_' . $currency . ' + ' . $payout . ' ' .
                ',total_income_' . $currency . ' = total_income_' . $currency . ' + ' . $payout . ' ' .
                ',total_turnover_' . $currency . ' = total_turnover_' . $currency . ' + ' . $deposit . ' ' .

                'WHERE id = ' . $affiliate->getId());

        return $affiliateUrl;
    }
}
