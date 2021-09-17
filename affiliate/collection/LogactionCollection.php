<?php

namespace affiliate\collection;


use affiliate\model\Logaction;
use system\components\DB;
use system\components\Url;

class LogactionCollection
{
	public static function getActionsCount ($affiliate_id)
	{
		$q = 'SELECT COUNT(id) FROM "' . TBL_AFFILIATE_ACTION_LOG . '" WHERE affiliate_id =  ' . $affiliate_id;

		$row = DB::getInstance()
			->row($q);

		return $row == NULL ? 0 : $row['count'];
	}

	public static function getList($affiliate_id, $filters = null, $pagination = null, $limit = null)
	{
        $where = ' ';
        if ($filters != null && !empty($filters)) {
            foreach ($filters as $key => $filter) {
                if (!empty($filter)) {

                    switch ($key) {
                        case 'action':
                            $q .= ' AND al.action = ' . $filter;
                            break;
                        case 'smartlink':
                            $q .= ' AND au.id = ' . $filter;
                            break;
                        case 'offer':
                            $q .= ' AND al.offer_id = ' . $filter;
                            break;
                        case 'date':
                            $filterExp = explode('-', $filter);
                            $from = $filterExp[0];
                            $before = $filterExp[1];
                            $q .= ' AND al.created >= ' .  strtotime($from) ;
                            $q .= ' AND al.created <= ' .  strtotime($before) ;
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
            ' WHERE al.affiliate_id =  ' . $affiliate_id;

        $sum_query = 'SELECT ' .
            'null as id, ' .
            'null as affiliate_id, ' .
            'null as url_id, ' .
            'null as action , ' .
            'null as user_id, ' .
            'SUM(al.deposit) as deposit, ' .
            'null as currency, ' .
            'null as geo, ' .
            'SUM(al.payout) as payout, ' .
            'null as created, ' .
            'null as user_uid, ' .
            'null as title '
            .'FROM "' . TBL_AFFILIATE_ACTION_LOG . '" al ' .
            'LEFT JOIN ' . TBL_AFFILIATE_URL . ' au ON al.url_id = au.id ' .
            ' WHERE al.affiliate_id =  ' . $affiliate_id. $where . $limit;
        $q = "({$main_query}) UNION ($sum_query)";
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