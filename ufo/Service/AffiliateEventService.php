<?php
declare(strict_types=1);

namespace Ufo\Service;

use app\component\Browser;
use app\component\HashidHelper;
use system\components\DB;
use Ufo\Entity\LogDepositReturn;
use Ufo\Exception\AffiliateDuplicateTransactionException;
use Ufo\Exception\AffiliateServiceException;
use Ufo\Model\Affiliate;
use Ufo\Model\AffiliateActionLog;
use Ufo\Model\AffiliateUrl;
use Ufo\ValueObject\AffiliateAction;
use Ufo\ValueObject\PayoutType;

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
            'project_id' => $affiliateUrl->project_id,
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
            'project_id' => $affiliateUrl->project_id,
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
    public function logDepositBySmartlink(Affiliate $affiliate, string $smartlink, string $ip, ?string $geo, $deposit, $payout, $currency, string $userUid, string $transactionId): LogDepositReturn
    {
        $affiliateUrl = $this->findAffiliateUrlBySmartlink($smartlink);
        if (!$affiliateUrl) {
            throw new AffiliateServiceException('Url by smartlink not found');
        }
        if ($transactionId && ($transactionCount = AffiliateActionLog::where('transaction_id', $transactionId)->count())) {
            throw new AffiliateDuplicateTransactionException($transactionId, $transactionCount);
        }

        $affiliateActionLog = new AffiliateActionLog();
        $affiliateActionLog->affiliate_id = $affiliate->getId();
        $affiliateActionLog->url_id = $affiliateUrl->id;
        $affiliateActionLog->user_uid = $userUid;
        $affiliateActionLog->action = AffiliateAction::DEPOSIT;
        $affiliateActionLog->created = time();
        $affiliateActionLog->ip = $ip;
        $affiliateActionLog->geo = $geo;
        $affiliateActionLog->deposit = $deposit;
        $affiliateActionLog->currency = mb_strtoupper($currency);
        $affiliateActionLog->transaction_id = $transactionId;
        $affiliateActionLog->project_id = $affiliateUrl->project_id;
//        if ($affiliate->revshare_percent) { // TODO: pri 0% dlja svoih ne rabotaet - kidaet oshibku
            $affiliateActionLog->payout_type = PayoutType::PERCENT;
            $affiliateActionLog->payout_value = $affiliate->revshare_percent;
//        } else {
//            throw new AffiliateServiceException('Unhandled payout type');
//        }
        $affiliateActionLog->save();
        $affiliateActionLog->refresh();

        return new LogDepositReturn(
            $affiliateUrl,
            $affiliateActionLog,
        );
    }

    public function logDepositByUrlId(Affiliate $affiliate, int $urlId, string $ip, ?string $geo, $deposit, $payout, $currency, string $userUid, string $transactionId): LogDepositReturn
    {
        $affiliateUrl = $this->findAffiliateUrlByUrlId($urlId);
        if (!$affiliateUrl) {
            throw new AffiliateServiceException('Url by ID not found');
        }
        if ($transactionId && ($transactionCount = AffiliateActionLog::where('transaction_id', $transactionId)->count())) {
            throw new AffiliateDuplicateTransactionException($transactionId, $transactionCount);
        }

        $affiliateActionLog = new AffiliateActionLog();
        $affiliateActionLog->affiliate_id = $affiliate->getId();
        $affiliateActionLog->url_id = $affiliateUrl->id;
        $affiliateActionLog->user_uid = $userUid;
        $affiliateActionLog->action = AffiliateAction::DEPOSIT;
        $affiliateActionLog->created = time();
        $affiliateActionLog->ip = $ip;
        $affiliateActionLog->geo = $geo;
        $affiliateActionLog->deposit = $deposit;
        $affiliateActionLog->currency = mb_strtoupper($currency);
        $affiliateActionLog->transaction_id = $transactionId;
        $affiliateActionLog->project_id = $affiliateUrl->project_id;
//        if ($affiliate->revshare_percent) { // TODO: pri 0% dlja svoih ne rabotaet - kidaet oshibku
            $affiliateActionLog->payout_type = PayoutType::PERCENT;
            $affiliateActionLog->payout_value = $affiliate->revshare_percent;
//        } else {
//            throw new AffiliateServiceException('Unhandled payout type');
//        }
        $affiliateActionLog->save();
        $affiliateActionLog->refresh();

        DB::getInstance()
            ->query(
                'UPDATE "' . TBL_AFFILIATE . '" ' .
                'SET ' .

                'balance_' . $currency . ' = balance_' . $currency . ' + ' . $affiliateActionLog->payout_amount . ' ' .
                ',total_income_' . $currency . ' = total_income_' . $currency . ' + ' . $affiliateActionLog->payout_amount . ' ' .
                ',total_turnover_' . $currency . ' = total_turnover_' . $currency . ' + ' . $deposit . ' ' .

                'WHERE id = ' . $affiliate->getId());

        return new LogDepositReturn(
            $affiliateUrl,
            $affiliateActionLog,
        );
    }
}
