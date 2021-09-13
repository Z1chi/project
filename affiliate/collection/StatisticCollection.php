<?php

namespace affiliate\collection;

class StatisticCollection
{
    public static function getList($affiliate_id, $filters, $group_by, $pagination = null, $limit = null) {

        $query =
            "SELECT SUM(deposit) AS sum_deposit,
                    aal.affiliate_id,
                    aal.created_dt,
                    COUNT(CASE WHEN aal.action = 1 THEN 1 END)            as clicks,
                    COUNT(DISTINCT unique_click_table.user_id)  AS unique_clicks,
                    COUNT(CASE WHEN aal.action  = 3 THEN 1 END) AS deposits
            FROM affiliate_action_log aal
                JOIN (SELECT user_id, created_dt FROM affiliate_action_log WHERE action = 1 GROUP BY created_dt, user_id) 
                    unique_click_table
                ON aal.created_dt = unique_click_table.created_dt
            WHERE aal.affiliate_id = {$affiliate_id}
            GROUP BY aal.affiliate_id, aal.created_dt";
    }
}