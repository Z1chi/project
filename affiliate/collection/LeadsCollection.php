<?php

namespace affiliate\collection;

use app\model\User;
use system\components\DB;
use system\components\Url;

class LeadsCollection
{
	public static function getList ($affiliate_id, $pagination = null, $limit = null)
	{
		$q = 'SELECT "user".*, au.title url_title, ' .
			'(SELECT data FROM ' . TBL_LOG_USER . ' WHERE ' . TBL_LOG_USER . '.user_id = "' . TBL_USER . '".id AND action = \'' . \app\component\Logger::$ACTION_MINER_PAYMENT . '\' ORDER BY created DESC LIMIT 1) last_sum ' .
			'FROM "' . TBL_USER . '" ' .
			'LEFT JOIN ' . TBL_AFFILIATE_URL . ' au ON "user".affiliate_url_id = au.id ' .
			' WHERE "user".affiliate_id =  ' . $affiliate_id;

		$q .= 'ORDER BY "user".id DESC ';

		if ($pagination != null) {
			$q .= 'LIMIT ' . $pagination->getItemsOnPage() . ' ' .
				'OFFSET ' . $pagination->getOffset();
		} else if ($limit != null) {
			$q .= 'LIMIT ' . (int) $limit;
		}

		$list = DB::getInstance()
			->run($q);

		$users = [];

		foreach ($list as $k => $row)
		{
			$user = User::withRow($row);

			$user->info_url = Url::create('/leads/?id=' . $user->getEncodedId());
			$user->last_sum = '';
			$user->url_title = $row['url_title'];

			if (isset($row['last_sum'])) {

				$sum_json = json_decode($row['last_sum']);

				$user->last_sum = $sum_json->sum . ' ' . $sum_json->currency;
			}

			$users[] = $user;
		}

		return $users;
	}

	public static function getLeadsCount ($affiliate_id)
	{
		$q = 'SELECT COUNT(id) FROM "' . TBL_USER . '" WHERE "user".affiliate_id =  ' . $affiliate_id;

		$row = DB::getInstance()
			->row($q);

		return $row == NULL ? 0 : $row['count'];
	}
}