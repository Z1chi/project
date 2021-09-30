<?php

namespace admin\view;

use admin\model\Admin;
use App;
use Hackzilla\PasswordGenerator\Generator\ComputerPasswordGenerator;
use Illuminate\Database\Eloquent\Collection;
use system\components\DB;
use admin\component\Logger;
use admin\component\Pagination;
use system\components\Upload;
use system\components\Util;
use system\core\AdminController;
use Ufo\Exception\UfoException;
use Ufo\Model\AdminShift;
use Ufo\Model\Support;
use Ufo\Service\AdminShiftService;


class SupportView extends AdminController
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

    private function showInfo($id)
    {
        $this->setTemplate('info');

        $support = Support::where('id', $id)->first();

        $this->pushTemplateData([
            'SUPPORT' => $support,
        ]);
    }

    public function showList()
    {

        $this->setMetaTitle('Supports');

        $this->pagination = new Pagination(KEY_ON_PAGE_COUNT);

        $calls_count = $this->getSupportsCount();
        $this->pagination->setItemsCount($calls_count);

        $supports = $this->getSupportsList();
        $pages = $this->pagination->getPaginationHtml(MODULE_TEMPLATE . '/pagination.php');

        $this->pushTemplateData([
            'LIST' => $supports,
            'PAGES' => $pages
        ]);
    }

    public function indexAction()
    {
        if ($this->id == NULL) {
            $this->showList();
        } else {
            $this->showInfo($this->id);
        }
    }

    public function getSupportsCount()
    {
        return $this->getSupportsList()->count();
    }

    public function getSupportsList()
    {
        return Support::get();
    }

    public function ajaxAddSupport()
    {
        $data['name'] = Util::sanitize($_POST['name']);
        $data['tg_link'] = Util::sanitize($_POST['tg_link']);
        $data['active'] = (int)$_POST['active'];

        if ($data['tg_link'] == '') {
            $this->jsonErrorMsg('Ссылка на телеграм является обязательным полем');
        }

        if(!empty($_FILES["image"]["tmp_name"])) {
            $imgName = $_FILES["image"]["tmp_name"];
            try {
                $newName = Upload::ajaxUploadImage($imgName, null, ROOT.'/public/upload/');
            } catch (\ImagickException $e) {
                $this->jsonErrorMsg($e->getMessage());
            }
            $data['image'] = '/upload/'.$newName.'.jpg';
        }

        $support = new Support();
        $support->name = $data['name'];
        $support->image = $data['image'];
        $support->tg_link = $data['tg_link'];
        $support->active = $data['active'];

        Logger::write(
            Logger::$ACTION_SUPPORT_ADD,
            $data);

        if ($support->save()) {
            $this->jsonSuccess();
        }else{
            $this->jsonError();
        }
    }


    public function ajaxUpdate ()
    {
        if (!isset($_POST['id'])) {
            $this->jsonErrorMsg('Произошла ошибка!');
        }

        $id = Util::sanitize($_POST['id']);

        $support = Support::where('id', $id)->first();

        if (!$support) {
            $this->jsonErrorMsg('Пользователь не найден!');
        }

        $data['name'] = Util::sanitize($_POST['name']);
        $data['tg_link'] = Util::sanitize($_POST['tg_link']);
        $data['active'] = (int)$_POST['active'];

        $log = $data;
        $log['id'] = $id;

        if(is_uploaded_file($_FILES["image"]["tmp_name"])) {
            $imgName = $_FILES["image"]["tmp_name"];
            try {
                $newName = Upload::ajaxUploadImage($imgName, null, ROOT.'/public/upload/');
            } catch (\ImagickException $e) {
                $this->jsonErrorMsg($e->getMessage());
            }
            unlink(ROOT.'/public/'.$support->img); //deleting old img
            $data['image'] = '/upload/'.$newName.'.jpg';
            $support->image = $data['image'];
        }

        $support->name = $data['name'];
        $support->tg_link = $data['tg_link'];
        $support->active = $data['active'];


        Logger::write(
            Logger::$ACTION_SUPPORT_UPDATE,
            $log);

        if ($support->save()) {
            $this->jsonSuccess();
        }else{
            $this->jsonError();
        }
    }

}