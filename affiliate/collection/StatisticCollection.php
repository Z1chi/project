<?php

namespace affiliate\collection;

use system\components\DB;
use system\components\Util;

class StatisticCollection
{
    public static function getStatisticCount($affiliate_id, $filters)
    {
        $andWhere = ' ';
        if ($filters != null && !empty($filters)) {
            foreach ($filters as $key => $filter) {
                if (!empty($filter)) {
                    switch ($key) {
                        case 'offer':
                            $q .= ' AND offer_id = ' . Util::sanitize($filter);
                            break;
                        case 'smartlink':
                            $q .= ' AND url_id = ' . Util::sanitize($filter);
                            break;
                        case 'geo':
                            $q .= ' AND geo = ' . Util::sanitize($filter);
                            break;
                        case 'from':
                            $q .= ' AND created_dt >= \'' . Util::sanitize($filter). '\'';
                            break;
                        case 'to':
                            $q .= ' AND created_dt <= \'' . Util::sanitize($filter). '\'';
                            break;
                    }
                }
            }
        }

        $table = TBL_AFFILIATE_ACTION_LOG;
        $query =
            "SELECT COUNT(*) as count FROM (SELECT aal.created_dt
            FROM {$table} aal
            WHERE aal.affiliate_id = {$affiliate_id} 
                    {$andWhere}
            GROUP BY aal.affiliate_id, aal.created_dt) count_table";

        $row = DB::getInstance()
            ->row($query);

        return $row == NULL ? 0 : $row['count'];
    }

    public static function getList($affiliate_id, $filters, $order_by, $pagination = null, $limit = null)
    {
        $andWhere = ' ';

        if ($filters != null && !empty($filters)) {
            foreach ($filters as $key => $filter) {
                if (!empty($filter)) {
                    switch ($key) {
                        case 'offer':
                            $q .= ' AND offer_id = ' . Util::sanitize($filter);
                            break;
                        case 'smartlink':
                            $q .= ' AND url_id = ' . Util::sanitize($filter);
                            break;
                        case 'geo':
                            $q .= ' AND geo = ' . Util::sanitize($filter);
                            break;
                        case 'from':
                            $q .= ' AND created_dt >= \'' . Util::sanitize($filter). '\'';
                            break;
                        case 'to':
                            $q .= ' AND created_dt <= \'' . Util::sanitize($filter). '\'';
                            break;
                    }
                }
            }
        }

        $order_by_str = ' ';
        if(!empty($order_by)) {
            $order_by_str = "ORDER BY {$order_by['field']} {$order_by['direction']}";
        }
        $offset_limit = ' ';
        if ($pagination != null) {
            $offset_limit .= 'LIMIT ' . $pagination->getItemsOnPage() . ' ' .
                'OFFSET ' . $pagination->getOffset();
        } else if ($limit != null) {
            $offset_limit .= 'LIMIT ' . (int) $limit;
        }
        $table = TBL_AFFILIATE_ACTION_LOG;
        $query =
            "SELECT aal.created_dt,
                    SUM(deposit) as sum_deposit,
                    COUNT(CASE WHEN aal.action = 1 THEN 1 END)  AS clicks,
                    COUNT(DISTINCT unique_click_table.user_id)  AS unique_clicks,
                    --COUNT(CASE WHEN aal.action  = 3 THEN 1 END) AS deposits,
                    CAST(COUNT(CASE WHEN aal.action  = 3 THEN 1 END) as decimal) / COUNT(CASE WHEN aal.action = 1 THEN 1 END) AS EPC 
            FROM {$table} aal
                JOIN (
                    SELECT user_id, created_dt FROM {$table} 
                    WHERE action = 1 
                    {$andWhere}
                    GROUP BY created_dt, user_id) 
                    unique_click_table
                ON aal.created_dt = unique_click_table.created_dt
            WHERE aal.affiliate_id = {$affiliate_id} 
                    {$andWhere}
            GROUP BY aal.affiliate_id, aal.created_dt 
            {$order_by_str}
            UNION ALL(
                SELECT NULL as created_dt, SUM(deposit) as sum_deposit,
                    COUNT(CASE WHEN aal_footer.action = 1 THEN 1 END) as clicks,
                    COUNT(DISTINCT unique_click_table_footer.user_id)  AS unique_clicks,
                    --COUNT(CASE WHEN aal.action  = 3 THEN 1 END) AS deposits,
                    CAST(COUNT(CASE WHEN aal_footer.action  = 3 THEN 1 END) as decimal) /
                        COUNT(CASE WHEN aal_footer.action = 1 THEN 1 END) AS EPC
                FROM {$table} aal_footer
                JOIN (SELECT user_id, created_dt FROM {$table} 
                        WHERE action = 1 and affiliate_id = 1  {$andWhere}
                GROUP BY created_dt, user_id) unique_click_table_footer
                  ON aal_footer.created_dt = unique_click_table_footer.created_dt
                )
            {$offset_limit}";

        $list = DB::getInstance()
            ->run($query);

        foreach ($list as &$row) {
            if(!empty($row['created_dt']))
                $row['created_dt'] = explode(' ', $row['created_dt'])[0];
            $row['epc'] = number_format((float)$row['epc'], 2, '.', '');
        }
        return $list;

    }
}