<?php
declare(strict_types=1);

namespace Ufo\Exception;

class AffiliateDuplicateTransactionException extends AffiliateServiceException
{
    private string $transactionId;
    private int $transactionCount;

    public function __construct(string $transactionId, int $transactionCount = 0)
    {
        parent::__construct(sprintf('Record with the same transaction id already present in db %dx time', $transactionCount));

        $this->transactionId = $transactionId;
        $this->transactionCount = $transactionCount;
    }

    public function getTransactonId(): string
    {
        return $this->transactionId;
    }

    public function getTransactionCount(): int
    {
        return $this->transactionCount;
    }
}
