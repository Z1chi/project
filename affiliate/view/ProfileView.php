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
        if(!empty($_POST['oldPassword'])) {
            $oldPasswordHash = Affiliate::find($this->affiliateId)->password;
            $notValidOldPassword = !password_verify($_POST['oldPassword'], $oldPasswordHash);
            if ($notValidOldPassword)
            {
                $this->jsonErrorData(['oldPassword' => 'Password is incorrect']);
            }
        }


        $imgName = $_FILES["img"]["tmp_name"];
        $newName = Upload::ajaxUploadImage($imgName, null, ROOT.'/assets_affiliate/img');

        $data = [
            'wallet' => Util::sanitize($_POST['wallet']),
            'img' => '/public/assets_affiliate/img'.$newName,
            'email' => Util::sanitize($_POST['email']),
            'password' => password_hash(Util::sanitize($_POST['newPassword']), PASSWORD_BCRYPT),
            'telegram' => Util::sanitize($_POST['telegram']),
            'first_name' => Util::sanitize($_POST['firstName']),
            'last_name' => Util::sanitize($_POST['lastName']),
        ];

        $isUpdated = Affiliate::update($data);
        if($isUpdated) {
            Logger::write(Logger::$ACTION_AFFILIATE_UPDATE, $data);

            $this->jsonSuccess();
        } else {
            $this->jsonErrorMsg("Profile is not updated");
        }
    }
}