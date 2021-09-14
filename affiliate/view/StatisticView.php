<?php

namespace affiliate\view;

use admin\component\Pagination;
use affiliate\collection\LogactionCollection;
use affiliate\collection\StatisticCollection;
use affiliate\model\Smartlink;
use system\components\Util;
use system\core\AffiliateController;

class StatisticView extends AffiliateController
{
    public int $filter_offer = 0;
    public int $filter_smartlink = 0;
    public int $filter_geo = 0;
    public string $order_by_field = '';
    public string $order_by_direction = '';

    public int $affiliate_id = 0;

    public function init()
    {
        $this->affiliate_id = $_SESSION[SESSION_KEY_CURRENT]['id'];
    }
    public function showList() {
        $this->initFilters();

        $this->pagination = new Pagination(50);

        $statistic_count = StatisticCollection::getStatisticCount($this->affiliate_id, $this->collectFilters());
        $this->pagination->setItemsCount($statistic_count);

        $statistic = StatisticCollection::getList($this->affiliate_id, $this->collectFilters(), [], $this->pagination);
        $footer = array_pop($statistic);

        $pages = $this->pagination->getPaginationHtml(MODULE_TEMPLATE . '/pagination.php');

        $this->pushTemplateData([
            'LIST' => $statistic,
            'LIST_FOOTER' => $footer,
            'PAGES' => $pages,
            'SMARTLINKS' => Smartlink::getSmartlinksList($this->affiliate_id),
            'FILTER_OFFER' => $this->filter_offer,
            'FILTER_SMARTLINK_ID' => $this->filter_smartlink
        ]);
    }

    public function initFilters ()
    {
        if (isset($_GET['action'])) {
            $this->filter_offer = (int) $_GET['action'];
        }

        if (isset($_GET['smartlink'])) {
            $this->filter_smartlink = (int) $_GET['smartlink'];
        }

        if (isset($_GET['geo'])) {
            $this->filter_geo = (int) $_GET['geo'];
        }

        if (isset($_GET['orderByField'])) {
            $this->order_by_field = Util::sanitize($_GET['orderByField']);
        }

        if (isset($_GET['orderByDir'])) {
            $this->order_by_direction = Util::sanitize($_GET['orderByDir']);
        }
    }

    public function collectFilters ()
    {
        $filters = [
            'offer' => $this->filter_offer,
            'smartlink' => $this->filter_smartlink,
            'geo' => $this->filter_geo,
        ];

        return $filters;
    }

    public function indexAction()
    {
        $this->showList();
    }



}