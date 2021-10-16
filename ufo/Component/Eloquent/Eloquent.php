<?php
declare(strict_types=1);

namespace Ufo\Component\Eloquent;

use Illuminate\Database\Eloquent\Model;

abstract class Eloquent extends Model
{
    /**
     * Update columns from ID
     * @param int $id
     * @param array $data
     * @return int
     */
    public static function updateById(int $id, array $data): int
    {
        return self::query()->where('id', '=', $id)->update($data);
    }

    /**
     * Check exist from ID
     * @param int $id
     * @return bool
     */
    public static function isExistsById(int $id): bool
    {
        return self::query()->where('id', '=', $id)->exists();
    }
}
