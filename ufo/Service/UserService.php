<?php
declare(strict_types=1);

namespace Ufo\Service;

use Ufo\Model\User;
use Illuminate\Database\Eloquent\Collection;

final class UserService
{
    public function findAllByAdminId(int $adminId): Collection
    {
        return User::where('admin_id', $adminId)->get();
    }
}
