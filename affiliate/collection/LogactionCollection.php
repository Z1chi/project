<?php

namespace affiliate\collection;


use admin\component\Pagination;
use affiliate\model\Logaction;
use system\components\DB;
use system\components\Url;

class LogactionCollection
{
	public static function getActionsCount ($affiliate_id, array $filters)
	{
        $where = ' ';
        if ($filters != null && !empty($filters)) {
            foreach ($filters as $key => $filter) {
                if (!empty($filter)) {
                    switch ($key) {
                        case 'action':
                            $where .= ' AND action = ' . $filter;
                            break;
                        case 'smartlink':
                            $where .= ' AND url_id = ' . $filter;
                            break;
                        case 'offer':
                            $where .= ' AND offer_id = ' . $filter;
                            break;
                        case 'date':
                            $filterExp = explode('-', $filter);
                            $from = $filterExp[0];
                            $before = $filterExp[1];
                            $where .= ' AND created >= ' .  strtotime($from) ;
                            $where .= ' AND created <= ' .  strtotime($before) ;
                            break;
                    }
                }
            }
        }
		$q = 'SELECT COUNT(id) FROM "' . TBL_AFFILIATE_ACTION_LOG . '" 
		WHERE affiliate_id =  ' . $affiliate_id . ' '. $where;

		$row = DB::getInstance()
			->row($q);

		return $row == NULL ? 0 : $row['count'];
	}

	public static function getList(
        int $affiliate_id, array $filters = null, Pagination $pagination = null, int $limit = null): array
	{
        $where = ' ';
        if ($filters != null && !empty($filters)) {
            foreach ($filters as $key => $filter) {
                if (!empty($filter)) {
                    switch ($key) {
                        case 'action':
                            $where .= ' AND al.action = ' . $filter;
                            break;
                        case 'smartlink':
                            $where .= ' AND au.id = ' . $filter;
                            break;
                        case 'offer':
                            $where .= ' AND al.offer_id = ' . $filter;
                            break;
                        case 'date':
                            $filterExp = explode('-', $filter);
                            $from = $filterExp[0];
                            $before = $filterExp[1];
                            $where .= ' AND al.created >= ' .  strtotime($from) ;
                            $where .= ' AND al.created <= ' .  strtotime($before) ;
                            break;
                    }
                }
            }
        }

		$order_by = ' ORDER BY "al".id DESC ';

		if ($pagination != null) {
			$limit = 'LIMIT ' . $pagination->getItemsOnPage() . ' ' .
				'OFFSET ' . $pagination->getOffset();
		} else if ($limit != null) {
			$limit = 'LIMIT ' . (int) $limit;
		}

        $main_query = 'SELECT ' .
            'al.id, ' .
            'al.affiliate_id, ' .
            'al.url_id, ' .
            'al.action, ' .
            'al.user_id, ' .
            'al.deposit, ' .
            'al.currency, ' .
            'al.geo, ' .
            'al.payout, ' .
            'al.created, ' .
            'al.user_uid, ' .
            'au.title url_title, ' .
            'pr.title offer_title ' .
            'FROM "' . TBL_AFFILIATE_ACTION_LOG . '" al ' .
            'LEFT JOIN ' . TBL_AFFILIATE_URL . ' au ON al.url_id = au.id ' .
            'LEFT JOIN project pr ON pr.id = au.project_id ' .
            ' WHERE al.affiliate_id =  ' . $affiliate_id . $where  . $order_by. $limit;

        $sum_query = '
select
        null                          as id,
        null                          as affiliate_id,
        null                          as url_id,
        null                          as action,
        null                          as user_id,
        SUM(limited_subquery.deposit) as deposit,
        limited_subquery.currency     as currency,
        null                          as geo,
        SUM(limited_subquery.payout)  as payout,
        null                          as created,
        null                          as user_uid,
        null                          as url_title,
        null                          as offer_title
 from (SELECT al.deposit as deposit,
              al.payout  as payout,
              al.currency
       FROM "affiliate_action_log" al
                LEFT JOIN affiliate_url au ON al.url_id = au.id
       WHERE al.affiliate_id = '.$affiliate_id.' '.$where.' '.$order_by.'
       '.$limit. ') limited_subquery group by limited_subquery.currency';
        $q = "({$main_query}) UNION ALL ($sum_query)";
		$list = DB::getInstance()
			->run($q);

		$actions = [];

		foreach ($list as $k => $row)
		{
			$action = Logaction::withRow($row);
			$action->url_title = $row['url_title'];
			$action->offer_title = $row['offer_title'];
			$action->info_url = Url::create('/leads/?id=' . $row['user_uid']);

			$actions[] = $action;
		}

		return $actions;
	}
}