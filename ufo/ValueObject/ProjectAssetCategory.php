<?php
declare(strict_types=1);

namespace Ufo\ValueObject;

class ProjectAssetCategory
{
    public const VIDEO = 1;
    public const BANNER = 2;
    public const ANIMATED = 3;
    public const LANDING = 4;
    public const ARCHIVE = 5;

    public static function getCategories(): array
    {
        return [
            self::VIDEO => 'Video',
            self::BANNER => 'Banner',
            self::ANIMATED => 'Animated banner',
            self::LANDING => 'Landing',
            self::ARCHIVE => 'Archive',
        ];
    }
}
