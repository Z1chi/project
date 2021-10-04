<?php
declare(strict_types=1);

namespace Ufo\Service;

use admin\component\Pagination;
use Ufo\Repository\AffiliateStatisticRepository;

final class AffiliateStatisticService
{
    public function getAffiliateStatisticFormatted(
        array $filters, array $orderBy = null, Pagination $pagination = null , int $limit = null): array
    {
        $affiliateId = $filters['affiliate'];
        unset($filters['affiliate']);

        $list = (new AffiliateStatisticRepository())->getStatistic($affiliateId, $filters, $orderBy, $pagination, $limit);

        foreach ($list as &$row) {
            if(!empty($row['created_dt']))
                $row['created_dt'] = explode(' ', $row['created_dt'])[0];

            if(!empty($row['cr'])) {
                $row['cr'] = number_format((float)$row['cr'], 2, '.', '');
            } else {
                $row['cr'] = 'N/A';
            }

            if(!empty($row['epc'])) {
                $row['epc'] = number_format((float)$row['epc'], 2, '.', '');
            } else {
                $row['epc'] = 'N/A';
            }

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