<?php

namespace affiliate\view;

use admin\component\Pagination;
use affiliate\model\Smartlink;
use system\components\Util;
use system\core\AffiliateController;
use Ufo\Repository\AffiliateStatisticRepository;
use Ufo\Service\AffiliateStatisticService;

class StatisticView extends AffiliateController
{
    public int $filterOffer = 0;
    public int $filterSmartlink = 0;
    public int $filterGeo = 0;
    public string $order_by_field = '';
    public string $order_by_direction = '';

    public int $affiliateId = 0;

    public function init(): void
    {
        $this->affiliateId = $_SESSION[SESSION_KEY_CURRENT]['id'];
    }

    public function showList() : void {
        $this->initFilters();

        $pagination = new Pagination(50);

        $statistic_count = (new AffiliateStatisticRepository())->getStatisticCount($this->collectFilters());
        $pagination->setItemsCount($statistic_count);

        $affiliateStatisticFormatted =
            (new AffiliateStatisticService())->getAffiliateStatisticFormatted($this->collectFilters(), [], $pagination);
        $statistic = $affiliateStatisticFormatted['list'];
        $sum_row = $affiliateStatisticFormatted['sum'];

        $pages = $pagination->getPaginationHtml(MODULE_TEMPLATE . '/pagination.php');

        $this->pushTemplateData([
            'LIST' => $statistic,
            'SUM_ROW' => $sum_row,
            'PAGES' => $pages,
            'SMARTLINKS' => Smartlink::getSmartlinksList($this->affiliateId),
            'FILTER_OFFER' => $this->filterOffer,
            'FILTER_SMARTLINK_ID' => $this->filterSmartlink
        ]);
    }

    public function initFilters(): void
    {
        if (isset($_GET['action'])) {
            $this->filterOffer = (int) $_GET['action'];
        }

        if (isset($_GET['smartlink'])) {
            $this->filterSmartlink = (int) $_GET['smartlink'];
        }

        if (isset($_GET['geo'])) {
            $this->filterGeo = (int) $_GET['geo'];
        }

        if (isset($_GET['orderByField'])) {
            $this->order_by_field = Util::sanitize($_GET['orderByField']);
        }

        if (isset($_GET['orderByDir'])) {
            $this->order_by_direction = Util::sanitize($_GET['orderByDir']);
        }
    }

    public function collectFilters(): array
    {
        $filters = [
            'offer' => $this->filterOffer,
            'smartlink' => $this->filterSmartlink,
            'geo' => $this->filterGeo,
            'affiliate' => $this->affiliateId
        ];

        return $filters;
    }

    public function indexAction(): void
    {
        $this->showList();
    }
}
