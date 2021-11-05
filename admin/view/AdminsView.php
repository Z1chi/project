<?php

namespace admin\view;


use admin\model\Admin;
use App;
use Hackzilla\PasswordGenerator\Generator\ComputerPasswordGenerator;
use Illuminate\Database\Eloquent\Collection;
use system\components\DB;
use admin\component\Logger;
use admin\component\Pagination;
use system\components\Util;
use system\core\AdminController;
use Ufo\Exception\UfoException;
use Ufo\Model\AdminShift;
use Ufo\Service\AdminShiftService;

class AdminsView extends AdminController
{
	public $authorizationRequired = true;

	/**
	 * @var Pagination
	 */
	private $pagination;
	private $id;

	public function init()
	{
		if (Admin::getLevel() < Admin::$LEVEL_CALL_CENTER_SUPERVISOR) {
			$this->show404();
		}

		$id = App::getCurrentUrl()->query->get('id');

		$this->id = $id;
	}

	public function indexAction()
	{
        if ($this->id == NULL) {
            $this->showList();
        } else {
            $this->showInfo($this->id);
        }
	}

	public function shiftsAction()
	{
        $this->setMetaTitle('Админы');

        $this->pagination = new Pagination(KEY_ON_PAGE_COUNT);

        $calls_count = $this->getAdminsCount();
        $this->pagination->setItemsCount($calls_count);

        /* @var \Ufo\Model\Admin $admin */
        $admin = \Ufo\Model\Admin::find($this->id);
        $shifts = $this->getShiftsList($this->id);
        $pages = $this->pagination->getPaginationHtml(MODULE_TEMPLATE . '/pagination.php');

        $this->pushTemplateData([
            'TITLE' => sprintf('Смены для %s', $admin->name),
            'LIST' => $shifts,
            'ACTIVE_SHIFT_ID' => null,
            'PAGES' => $pages,
            'ADMIN_ID' => $this->id,
        ]);
	}

	public function showList ()
	{
		$this->setMetaTitle('Админы');

		$this->pagination = new Pagination(KEY_ON_PAGE_COUNT);

		$calls_count = $this->getAdminsCount();
		$this->pagination->setItemsCount($calls_count);

		$affiliates = $this->getAdminsList();
		$pages = $this->pagination->getPaginationHtml(MODULE_TEMPLATE . '/pagination.php');

		$this->pushTemplateData([
			'LIST' => $affiliates,
			'PAGES' => $pages
		]);
	}

    private function showInfo($id)
    {
        $this->setTemplate('info');

        $admin = Admin::getAdminById($id);

        $this->pushTemplateData([
            'ADMIN' => $admin,
            ]);
    }

	public function getAdminsCount ()
	{
		return $this->getAdminsList(true);
	}

	public function getAdminsList ($count_only = false)
	{
		if ($count_only) {
			$q = 'SELECT COUNT(id) ';
		} else {
			$q =
				'SELECT *';
		}

		$q .= ' FROM "' . TBL_ADMIN . '" WHERE level < ' . Admin::getLevel();

		// Return list count

		if ($count_only)
		{
			$row = DB::getInstance()
				->row($q);

			return $row == NULL ? 0 : $row['count'];
		}

		$q .= ' ORDER BY active DESC, id DESC ';

		$q .= ' LIMIT ' . $this->pagination->getItemsOnPage() . ' ' .
			'OFFSET ' . $this->pagination->getOffset();

		$list = DB::getInstance()
			->run($q);

		$affiliates = [];

		foreach ($list as $k => $row)
		{
            $row['shift_count'] = 0;
			$affiliate = Admin::withRow($row);
			$affiliates[] = $affiliate;
		}

		return $affiliates;
	}

    /**
     * @param bool $countOnly
     * @return int|Collection|AdminShift[]
     */
    private function getShiftsList(int $adminId, $countOnly = false)
    {
        [];
    }

	public function ajaxActivate ()
	{
		$affiliate_id = (int) $_POST['admin_id'];
		$active = ((int) $_POST['active']) == 1;

		$data = ['active' => $active ? 1 : 0];
		$where = ['id' => $affiliate_id];
		$log = array_merge($data, $where);

		DB::getInstance()->update(TBL_ADMIN, $data, $where);

		Logger::write(
			$active ?
				Logger::$ACTION_ADMIN_ACTIVATE :
				Logger::$ACTION_ADMIN_DEACTIVATE,
			$log);

		$this->jsonSuccess();
	}

    public function ajaxUpdate ()
    {
        if (!isset($_POST['id'])) {
            $this->jsonErrorMsg('Произошла ошибка!');
        }

        $id = Util::sanitize($_POST['id']);

        $q = 'SELECT * FROM "' . TBL_ADMIN . '" WHERE id = ? AND level < ' . Admin::getLevel();
        $row = DB::getInstance()->row($q, $id);

        if (!$row) {
            $this->jsonErrorMsg('Пользователь не найден!');
        }

        $data['name'] = Util::sanitize($_POST['name']);
        $data['email'] = Util::sanitize($_POST['email']);
        $data['callcenter_percent'] = (int) $_POST['callcenter_percent'];
        $data['callcenter_id'] = (int) $_POST['callcenter_id'];
        $data['updated'] = time();

        $log = $data;
        $log['id'] = $id;

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $this->jsonErrorMsg('Неверный e-mail!');
        }

        if ($row['email'] != $data['email'] && Admin::isExists($data['email'])) {
            $this->jsonErrorMsg('Такой пользователь уже существует!');
        }

        DB::getInstance()
            ->update(TBL_ADMIN,
                $data,
                ['id' => $id]
            );

        Logger::write(
            Logger::$ACTION_ADMIN_UPDATE,
            $log);

        $this->jsonSuccess();
    }

    public function ajaxAddadmin ()
    {
        $time = date("Y-m-d H:i:s");

        $data['name'] = Util::sanitize($_POST['name']);
        $data['email'] = Util::sanitize($_POST['email']);
        $data['callcenter_percent'] = (int) $_POST['callcenter_percent'];
        $data['callcenter_id'] = (int) $_POST['callcenter_id'];
        $data['created_at'] = $time;
        $data['updated_at'] = $time;
        $data['active'] = 1;
        $data['level'] = Admin::$LEVEL_CALL_CENTER_WORKER;
        $data['password'] = 'null';

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $this->jsonErrorMsg('Неверный e-mail!');
        }

        if (Admin::isExists($data['email'])) {
            $this->jsonErrorMsg('Такой пользователь уже существует!');
        }

        DB::getInstance()
            ->insert(TBL_ADMIN,
                $data
            );

        Logger::write(
            Logger::$ACTION_ADMIN_ADD,
            $data);

        $this->jsonSuccess();
    }

    public function ajaxAddshift(): void
    {
        try {
            $adminId = (int) $_POST['admin_id'];
            $inputDateRange = $this->inputDateTimeRange(
                $_POST['shift_date_from'],
                $_POST['shift_time_from'],
                $_POST['shift_date_till'],
                $_POST['shift_time_till']
            );

            $adminShiftService = new AdminShiftService();
            $adminShiftService->create($adminId, $inputDateRange['from'], $inputDateRange['till']);
            // todo
//            Logger::write(
//                Logger::$ACTION_ADMIN_ADD,
//                $data);

            $this->jsonSuccess();
        } catch (\LogicException | UfoException $e) {
            $this->jsonErrorMsg($e->getMessage());
        }
    }

    public function ajaxRemoveshift(): void
    {
        $shift = AdminShift::find($_POST['shift_id']);
        if (!$shift) {
            $this->jsonErrorMsg('Смена не найдена. Попробуйте перезагрузить страницу');
        } elseif ($shift->delete()) {
            $this->jsonSuccess();
        } else {
            $this->jsonErrorMsg('Ошибка при удалении смены');
        }
    }

    public function ajaxResetpassword ()
    {
        $admin_id = (int) $_POST['admin_id'];
        $generator = new ComputerPasswordGenerator();

        $generator
            ->setUppercase()
            ->setLowercase()
            ->setNumbers()
            ->setSymbols(false)
            ->setLength(12);

        $password = $generator->generatePassword();

        $hash = password_hash($password, PASSWORD_BCRYPT);

        DB::getInstance()
            ->update(
                TBL_ADMIN,
                ['password' => $hash, 'updated' => time()],
                ['id' => $admin_id]
            );

        $this->jsonSuccessData(['password' => $password]);
    }

    private function inputDateTimeRange(string $dateFrom, string $timeFrom, string $dateTill, string $timeTill): array
    {
        $dateFrom = Util::sanitize($dateFrom);
        $timeFrom = Util::sanitize($timeFrom);
        $dateTill = Util::sanitize($dateTill);
        $timeTill = Util::sanitize($timeTill);

        $from = \DateTimeImmutable::createFromFormat('d.m.Y H:i:s', sprintf('%s %s:00', $dateFrom, $timeFrom));
        $till = \DateTimeImmutable::createFromFormat('d.m.Y H:i:s', sprintf('%s %s:00', $dateTill, $timeTill));
        if ($from->getTimestamp() > $till->getTimestamp()) {
            throw new \LogicException('Конечная дата не может быть раньше начальной');
        }
        if ($till->getTimestamp() < time()) {
            throw new \LogicException('Неактуальная конечная дата');
        }

        return [
            'from' => $from,
            'till' => $till,
        ];
    }
}
