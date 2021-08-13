<?php

namespace app\component;

class MinerType
{
	public static function getType ($eur)
	{
		$json = file_get_contents(ROOT . '/public/assets/miner_type.json');
		$types = (array) json_decode($json);

		$miner_type = 41;

		foreach ($types as $maxSum => $type) {

			if ($eur <= $maxSum) {
				$miner_type = $type;
				break;
			}
		}

		return $miner_type;
	}

}