<?php

namespace app\component;

use Hashids\Hashids;

class HashidHelper
{
	public static function encodeSmartlinkId ($id) {
		return self::hashSmartlinkId($id);
	}

	public static function decodeSmartlinkId ($id) {
		return self::hashSmartlinkId($id, true);
	}

	private static function hashSmartlinkId($id, $decode = false)
	{
		$h = new Hashids(getenv('HASHID_SMARTLINK_SALT'), getenv('HASHID_SMARTLINK_LENGTH'), getenv('HASHID_SMARTLINK_SYMBOLS'));

		if (!$decode) return $h->encode($id);
		else {
			$a = $h->decode($id);

			if (!isset($a[0])) {
				return false;
			}

			return $a[0];
		}
	}
}