<?php

namespace affiliate\view;

use affiliate\component\Logger;
use system\components\Upload;
use system\components\Util;
use system\core\AffiliateController;
use Ufo\Model\Affiliate;

class ProfileView extends AffiliateController
{
    public int $affiliateId = 0;

    public function init()
    {
        $this->affiliateId = $_SESSION[SESSION_KEY_CURRENT]['id'];
    }

    public function indexAction()
    {
        $affiliate = Affiliate::find($this->affiliateId);

        $this->pushTemplateData([
            'AFFILIATE' => $affiliate
        ]);
    }

    public function ajaxUpdate()
    {
        $data = [];

        if(!empty($_POST['oldPassword'])) {
            $oldPasswordHash = Affiliate::find($this->affiliateId)->password;
            $notValidOldPassword = !password_verify($_POST['oldPassword'], $oldPasswordHash);
            if ($notValidOldPassword)
            {
                $this->jsonErrorData(['oldPassword' => 'Password is incorrect']);
            }

            $data['password'] = password_hash($_POST['newPassword'], PASSWORD_BCRYPT);
        }

        $affiliate = Affiliate::find($this->affiliateId);

        if(!empty($_FILES["img"]["tmp_name"])) {
            $imgName = $_FILES["img"]["tmp_name"];
            try {
                $newName = Upload::ajaxUploadImage($imgName, null, ROOT.'/public/upload/');
            } catch (\ImagickException $e) {
                $this->jsonErrorMsg($e);
            }

            unlink(ROOT.'/public/'.$affiliate->img); //deleting old img
            $data['img'] = '/upload/'.$newName.'.jpg';
        }
        if(!empty(Util::sanitize($_POST['wallet']))) {
            $data['wallet'] = Util::sanitize($_POST['wallet']);
        }
        if(!empty(Util::sanitize($_POST['email']))) {
            $data['email'] = Util::sanitize($_POST['email']);
        }
        if(!empty(Util::sanitize($_POST['telegram']))) {
            $data['telegram'] = Util::sanitize($_POST['telegram']);
        }
        if(!empty(Util::sanitize($_POST['firstName']))) {
            $data['firstName'] = Util::sanitize($_POST['firstName']);
        }
        if(!empty(Util::sanitize($_POST['lastName']))) {
            $data['lastName'] = Util::sanitize($_POST['lastName']);
        }

        $isUpdated = $affiliate->update($data);
        if($isUpdated) {
            Logger::write(Logger::$ACTION_AFFILIATE_UPDATE, $data);

            $this->jsonSuccess();
        } else {
            $this->jsonErrorMsg("Profile is not updated");
        }
    }
}