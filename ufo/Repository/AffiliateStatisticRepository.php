<?php
declare(strict_types=1);

namespace Ufo\Repository;

use admin\component\Pagination;
use system\components\DB;
use system\components\Util;
use Ufo\Model\Affiliate;
use Ufo\Model\AffiliateUrl;

class AffiliateStatisticRepository
{
    public function getStatisticCount(array $filters): int
    {
        $andWhere = ' ';
        if ($filters != null && !empty($filters)) {
            foreach ($filters as $key => $filter) {
                if (!empty($filter)) {
                    switch ($key) {
                        case 'project':
                            $q .= ' AND project_id = ' . Util::sanitize($filter);
                            break;
                        case 'smartlink':
                            $q .= ' AND url_id = ' . Util::sanitize($filter);
                            break;
                        case 'geo':
                            $q .= ' AND geo = ' . Util::sanitize($filter);
                            break;
                    }
                }
            }
        }

        $table = TBL_AFFILIATE_ACTION_LOG;
        $query =
            'SELECT COUNT(*) as count FROM (SELECT aal.created_dt
            FROM '.$table.' aal
            WHERE aal.affiliate_id = '.$filters['affiliate'].'  
                    '.$andWhere.'
            GROUP BY aal.affiliate_id, aal.created_dt) count_table';

        $row = DB::getInstance()
            ->row($query);

        return $row['count'] ?? 0;
    }

    public function getStatistic(
        int $affiliateId, array $filters, array $orderBy = null, Pagination $pagination = null, int $limit = null): array
    {
        $andWhere = ' ';

        if ($filters != null && !empty($filters)) {
            foreach ($filters as $key => $filter) {
                if (!empty($filter)) {
                    switch ($key) {
                        case 'project':
                            $q .= ' AND project_id = ' . Util::sanitize($filter);
                            break;
                        case 'smartlink':
                            $q .= ' AND url_id = ' . Util::sanitize($filter);
                            break;
                        case 'geo':
                            $q .= ' AND geo = ' . Util::sanitize($filter);
                            break;
                    }
                }
            }
        }

        $orderByStr = ' ';
        if(!empty($orderBy)) {
            $orderByStr = 'ORDER BY '. $orderBy['field'] . ' ' .$orderBy['direction'];
        }

        $offsetLimit = ' ';
        if ($pagination != null) {
            $offsetLimit .= 'LIMIT ' . $pagination->getItemsOnPage() . ' ' .
                'OFFSET ' . $pagination->getOffset();
        } else if ($limit != null) {
            $offsetLimit .= 'LIMIT ' . (int) $limit;
        }
        $table = TBL_AFFILIATE_ACTION_LOG;
        $query =
            'SELECT aal.created_dt,
                    SUM(deposit) as sum_deposit,
                    COUNT(CASE WHEN aal.action = 1 THEN 1 END)  AS clicks,
                    COUNT(DISTINCT unique_click_table.user_id)  AS unique_clicks,
                    SUM(deposit) / 
                    COUNT(CASE WHEN aal.action = 1 THEN 1 END) AS EPC 
            FROM '.$table.' aal
                JOIN (
                    SELECT user_id, created_dt FROM '.$table.' 
                    WHERE action = 1 
                    '.$andWhere.'
                    GROUP BY created_dt, user_id) 
                    unique_click_table
                ON aal.created_dt = unique_click_table.created_dt
            WHERE aal.affiliate_id = '.$affiliateId.' 
                    '.$andWhere.'
            GROUP BY aal.affiliate_id, aal.created_dt 
            '.$orderByStr.'
            UNION ALL(
                SELECT NULL as created_dt, SUM(deposit) as sum_deposit,
                    COUNT(CASE WHEN aal_footer.action = 1 THEN 1 END) as clicks,
                    COUNT(DISTINCT unique_click_table_footer.user_id)  AS unique_clicks,
                    SUM(deposit) /
                        COUNT(CASE WHEN aal_footer.action = 1 THEN 1 END) AS EPC
                FROM '.$table.' aal_footer
                JOIN (SELECT user_id, created_dt FROM '.$table.' 
                        WHERE action = 1 and affiliate_id = 1  '.$andWhere.'
                GROUP BY created_dt, user_id) unique_click_table_footer
                  ON aal_footer.created_dt = unique_click_table_footer.created_dt
                )
            '.$offsetLimit;

        return DB::getInstance()
            ->run($query);
    }
}