<?php

namespace affiliate\view;

use system\core\AffiliateController;

class StatisticView extends AffiliateController
{
    public function init()
    {

    }

    public function indexAction()
    {
        $fields = [
            ['label' => 'Section1', 'filed_name' => 'sjifj2ofj'],
            ['label' => 'Section1', 'filed_name' => 'sjifj2ofj'],
            ['label' => 'Section1', 'filed_name' => 'sjifj2ofj'],
        ];
        $data = [
            'COLUMNS' => $fields
        ];

        $this->pushTemplateData($data);
    }

    /**
     * @var int
     */
    private $filter_orderFieldFilter = null;

    public function initFilters ()
    {
        if (isset($_GET['orderFieldFilter'])) {
            $this->filter_orderFieldFilter = (int) $_GET['orderFieldFilter'];
        }
    }

    public function collectFilters ()
    {
        $filters = [
            'orderFieldFilter' => $this->filter_orderFieldFilter,
        ];

        return $filters;
    }



}