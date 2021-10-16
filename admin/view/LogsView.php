<?php

namespace admin\view;

use admin\component\Logger;
use admin\component\Pagination;
use admin\model\Manager;
use App;
use DateTime;
use ufo\Model\Admin;
use system\core\AdminController;
use Ufo\Model\LogAdmin;

class LogsView extends AdminController
{
    private $pagination;

    private $filter_manager = null;
    private $filter_ts_from = null;
    private $filter_ts_to = null;
    private $filter_action = null;

    public function indexAction ()
    {
        if (Admin::getLevel() < Admin::LEVEL_CALL_CENTER_SUPERVISOR) {
            $this->show404();
        }

        $this->showList();
    }

    private function showList ()
    {
        $this->pagination = new Pagination(KEY_ON_PAGE_COUNT);

        $this->initFilters();

        $calls_count = $this->getListCount();
        $this->pagination->setItemsCount($calls_count);

        $subscribers = $this->getList();

        $manager_list = Manager::getList();

        $actions_list = Logger::getActionList();

        $pages = $this->pagination->getPaginationHtml(MODULE_TEMPLATE . '/pagination.php');

        $this->pushTemplateData([
            'LIST' => $subscribers,
            'PAGES' => $pages,
            'MANAGERS' => $manager_list,
            'FILTER_MANAGER' => $this->filter_manager,
            'ACTIONS' => $actions_list,
            'FILTER_ACTION' => $this->filter_action
        ]);
    }

    public function initFilters ()
    {
        if (isset($_GET['manager'])) {
            $this->filter_manager = (int) $_GET['manager'];
        }

        if (isset($_GET['action'])) {
            $this->filter_action = $_GET['action'];
        }

        if (isset($_GET['date'])) {
            $date_array = json_decode($_GET['date']);

            $this->filter_ts_from = new DateTime($date_array[0]);
            $this->filter_ts_from->setTime(0, 0);

            $this->filter_ts_to = new DateTime($date_array[1]);
            $this->filter_ts_to->setTime(23, 59, 59);
        }
    }

    public function getList($counts_only = false)
    {
        $q = LogAdmin::query()
            ->leftJoin(TBL_ADMIN, TBL_LOG_ADMIN.'.admin_id', '=', TBL_ADMIN.'.id')
            ->orderBy('created_at', 'desc');


        if (Admin::getLevel() < Admin::LEVEL_CALL_CENTER_SUPERVISOR) {
            $q = $q->where('admin_id', '=', App::getSession('id'));
        } else if ($this->filter_manager) {
            $q = $q->where('admin_id', '=', $this->filter_manager);
        }

        if ($this->filter_ts_from && $this->filter_ts_to) {
            $q = $q
                ->where(TBL_LOG_ADMIN.'.created_at', '>=', $this->filter_ts_from)
                ->where(TBL_LOG_ADMIN.'.created_at', '<=', $this->filter_ts_to);
        }

        if ($this->filter_action) {
            $q = $q->where('action', '=', $this->filter_action);
        }

        if ($counts_only)
            return $q->count(TBL_LOG_ADMIN.'.id');

        $q = $q
            ->limit($this->pagination->getItemsOnPage())
            ->offset($this->pagination->getOffset());

        return $q->get([TBL_LOG_ADMIN.'.*', TBL_ADMIN.'.name as admin_name']);
    }

    public function getListCount (): int
    {
        return $this->getList(true);
    }
}