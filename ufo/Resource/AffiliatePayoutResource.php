<?php
declare(strict_types=1);

namespace Ufo\Resource;

use Ufo\Model\AffiliateActionLog;

final class AffiliatePayoutResource
{
    public static function toArray(AffiliateActionLog $actionLog): array
    {
        return [
            'transaction_id' => $actionLog->transaction_id,
            'payout_type' => $actionLog->payout_type,
            'payout_value' => $actionLog->payout_value,
            'payout_amount' => $actionLog->payout_amount,
            'payout_currency' => $actionLog->payout_currency,
            'user_uid' => $actionLog->user_uid,
        ];
    }
}
