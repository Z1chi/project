<?php

namespace Ufo\Service;

use Ufo\Repository\AffiliateStatisticRepository;

class AffiliateStatisticService
{
    public static function getAffiliateStatisticFormatted($filters, $order_by = null, $pagination = null , $limit = null) {
        $affiliate_id = $filters['affiliate'];
        unset($filters['affiliate']);

        $list = AffiliateStatisticRepository::getStatistic($affiliate_id, $filters, $order_by, $pagination, $limit);

        foreach ($list as &$row) {
            if(!empty($row['created_dt']))
                $row['created_dt'] = explode(' ', $row['created_dt'])[0];
            $row['epc'] = number_format((float)$row['epc'], 2, '.', '');
            $row['sum_deposit'] =
                number_format((float)$row['sum_deposit'], 2, '.', ' ');
        }

        $sum = array_pop($list);
        return [
            'sum' => $sum,
            'list' => $list,
        ];
    }
}