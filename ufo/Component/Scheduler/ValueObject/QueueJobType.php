<?php
declare(strict_types=1);

namespace Ufo\Component\Scheduler\ValueObject;

use Ufo\ValueObject\AbstractValueObject;

final class QueueJobType extends AbstractValueObject
{
    public const AFFILIATE_SIGNUP = 'affiliate-signup';
    public const AFFILIATE_CLICK = 'affiliate-click';
    public const AFFILIATE_DEPOSIT = 'affiliate-deposit';

    public function is(string $value): bool
    {
        return $value === $this->getValue();
    }

    protected function isValidValue($value): bool
    {
        return in_array($value, [
            self::AFFILIATE_SIGNUP,
            self::AFFILIATE_CLICK,
            self::AFFILIATE_DEPOSIT,
        ]);
    }
}
