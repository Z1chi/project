<?php
declare(strict_types=1);

namespace Ufo\Entity;

use Ufo\Model\AffiliateActionLog;
use Ufo\Model\AffiliateUrl;

class LogDepositReturn
{
    private AffiliateUrl $url;
    private AffiliateActionLog $actionLog;

    public function __construct(AffiliateUrl $url, AffiliateActionLog $actionLog)
    {
        $this->url = $url;
        $this->actionLog = $actionLog;
    }

    public function getUrl(): AffiliateUrl
    {
        return $this->url;
    }

    public function getActionLog(): AffiliateActionLog
    {
        return $this->actionLog;
    }
}
