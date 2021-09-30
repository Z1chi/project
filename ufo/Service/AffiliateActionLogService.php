<?php
declare(strict_types=1);

namespace Ufo\Service;

use admin\component\Pagination;
use affiliate\model\Logaction;
use Illuminate\Database\Eloquent\Collection;
use ParagonIE\Corner\Exception;
use system\components\DB;
use system\components\Url;
use Ufo\Model\AffiliateActionLog;

class AffiliateActionLogService
{
    public function getActionsCount(int $affiliate_id, array $filters = null): int
    {
        if (!empty($filters['date'])) {
            $filterExp = explode('-', $filters['date']);
            $from = strtotime($filterExp[0]);
            $to = strtotime($filterExp[1]);
        } else {
            $from = '';
            $to = '';
        }

        return AffiliateActionLog::where(TBL_AFFILIATE_ACTION_LOG . '.affiliate_id', $affiliate_id)
            ->when($filters['action'] ?? false, function ($query) use ($filters) {
                return $query->where(TBL_AFFILIATE_ACTION_LOG . '.action', $filters['action']);
            })
            ->when($filters['smartlink'] ?? false, function ($query) use ($filters) {
                return $query->where(TBL_AFFILIATE_ACTION_LOG . '.url_id', $filters['smartlink']);
            })
            ->when($filters['project'] ?? false, function ($query) use ($filters) {
                return $query->where(TBL_AFFILIATE_ACTION_LOG . '.project_id', $filters['project']);
            })
            ->when($from, function ($query, $from) {
                return $query->where(TBL_AFFILIATE_ACTION_LOG . '.created', '>=', $from);
            })
            ->when($to, function ($query, $to) {
                return $query->where(TBL_AFFILIATE_ACTION_LOG . '.created', '<=', $to);
            })->count();
    }

    public function getActions(
        int $affiliate_id, array $filters = null, Pagination $pagination = null, int $limit = null): Collection
    {
        if (!empty($filters['date'])) {
            $filterExp = explode('-', $filters['date']);
            $from = strtotime($filterExp[0]);
            $to = strtotime($filterExp[1]);
        } else {
            $from = '';
            $to = '';
        }

        if (!empty($pagination)) {
            $limit = $pagination->getItemsOnPage();
            $offset = $pagination->getOffset();
        } else {
            $offset = 0;
            if (empty($limit)) {
                $limit = 50;
            }
        }

        return AffiliateActionLog::
        leftJoin(TBL_AFFILIATE_URL . ' as au', TBL_AFFILIATE_ACTION_LOG . '.url_id', '=', 'au.id')
            ->leftJoin(TBL_PROJECT . ' as pr', 'au.project_id', '=', 'pr.id')
            ->select(
                TBL_AFFILIATE_ACTION_LOG . '.id',
                TBL_AFFILIATE_ACTION_LOG . '.affiliate_id',
                'url_id',
                'action',
                'user_id',
                'deposit',
                'currency',
                'geo',
                TBL_AFFILIATE_ACTION_LOG . '.created',
                'user_uid',
                'payout',
                'au.title as url_title',
                'pr.title as project_title'
            )
            ->where(TBL_AFFILIATE_ACTION_LOG . '.affiliate_id', (string)$affiliate_id)
            ->when($filters['action'] ?? false, function ($query) use ($filters) {
                return $query->where(TBL_AFFILIATE_ACTION_LOG . '.action', $filters['action']);
            })
            ->when($filters['smartlink'] ?? false, function ($query) use ($filters) {
                return $query->where(TBL_AFFILIATE_ACTION_LOG . '.url_id', $filters['smartlink']);
            })
            ->when($filters['project'] ?? false, function ($query) use ($filters) {
                return $query->where(TBL_AFFILIATE_ACTION_LOG . '.project_id', $filters['project']);
            })
            ->when($from, function ($query, $from) {
                return $query->where(TBL_AFFILIATE_ACTION_LOG . '.created', '>=', $from);
            })
            ->when($to, function ($query, $to) {
                return $query->where(TBL_AFFILIATE_ACTION_LOG . '.created', '<=', $to);
            })
            ->limit($limit)
            ->offset($offset)
            ->orderBy(TBL_AFFILIATE_ACTION_LOG . '.id', 'DESC')
            ->get();
    }

    public function getSummary(
        int $affiliate_id, array $filters = null, Pagination $pagination = null, int $limit = null): array
    {
        $where = ' ';
        if ($filters != null && !empty($filters)) {
            foreach ($filters as $key => $filter) {
                if (!empty($filter)) {
                    switch ($key) {
                        case 'action':
                            $where .= ' AND al.action = ' . $filter;
                            break;
                        case 'smartlink':
                            $where .= ' AND al.url_id = ' . $filter;
                            break;
                        case 'offer':
                            $where .= ' AND al.offer_id = ' . $filter;
                            break;
                        case 'date':
                            $filterExp = explode('-', $filter);
                            $from = $filterExp[0];
                            $before = $filterExp[1];
                            $where .= ' AND al.created >= ' . strtotime($from);
                            $where .= ' AND al.created <= ' . strtotime($before);
                            break;
                    }
                }
            }
        }

        $order_by = ' ORDER BY "al".id DESC ';

        if ($pagination != null) {
            $limit = 'LIMIT ' . $pagination->getItemsOnPage() . ' ' .
                'OFFSET ' . $pagination->getOffset();
        } else if ($limit != null) {
            $limit = 'LIMIT ' . (int)$limit;
        }

        $query = '
SELECT SUM(deposit)                         as sum_deposit,
       COUNT(case when affiliate_action_log.action = 1 then 1 end) as clicks,
       COUNT(case when affiliate_action_log.action = 3 then 1 end) as deposits,
       COUNT(case when affiliate_action_log.action = 2 then 1 end) as registrations
        from (select deposit, action
FROM "affiliate_action_log" al
         LEFT JOIN affiliate_url au ON al.url_id = au.id
         LEFT JOIN project pr ON pr.id = au.project_id
WHERE al.affiliate_id = ' . $affiliate_id . $where . $order_by . $limit . ') affiliate_action_log';

        return DB::getInstance()
                ->run($query)[0] ?? [];
    }
}