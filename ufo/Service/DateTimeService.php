<?php
declare(strict_types=1);

namespace Ufo\Service;

final class DateTimeService
{
    public function getHumanDiff(\DateTimeInterface $date1, \DateTimeInterface $date2): string
    {
        $diff = $date1->diff($date2);
        if ($diff->d) {
            return $diff->format('%dд %hч');
        } else if (!$diff->h && !$diff->i) {
            return $diff->format('%sc');
        } else if (!$diff->i) {
            return $diff->format('%hч');
        } else if (!$diff->h) {
            return $diff->format('%iм');
        }

        return $diff->format('%hч %iм');
    }
}
