<?php

namespace app\component;

use Hashids\Hashids;

class HashidHelper
{
    /**
     * @deprecated
     */
    public static function encodeUserId ($id) {
        return self::hashUserId($id);
    }

    /**
     * @deprecated
     */
    public static function decodeUserId ($id) {
        return self::hashUserId($id, true);
    }

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

    private static function hashUserId($id, $decode = false)
    {
        $h = new Hashids(getenv('HASHID_USER_SALT'), getenv('HASHID_USER_LENGTH'), getenv('HASHID_USER_SYMBOLS'));

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
