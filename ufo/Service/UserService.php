<?php
declare(strict_types=1);

namespace Ufo\Service;

use app\component\HashidHelper;
use Ufo\Model\User;
use Illuminate\Database\Eloquent\Collection;

final class UserService
{
    public function findAllByAdminId(int $adminId): Collection
    {
        return User::where('admin_id', $adminId)->get();
    }

    /**
     * @param int|null $user_id
     * @return null|string
     */
    public function shaEncodeId(?int $user_id): string
    {
        return getenv('SHA_HASHID_USER_PREFIX') . HashidHelper::encodeUserId($user_id);
    }
}
