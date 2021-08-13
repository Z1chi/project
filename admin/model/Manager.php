<?php


namespace admin\model;


use system\components\DB;

class Manager
{
	public static function getList ($active_only = false)
	{
	    $q = 'SELECT id, name FROM "' . TBL_ADMIN . '" ';

	    if ($active_only) {
	        $q .= ' WHERE active=1 ';
        }

	    $q .= ' ORDER BY name ASC';

		$f = DB::getInstance()
            ->run($q);

		return $f;
	}
}