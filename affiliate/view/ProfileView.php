<?php

namespace affiliate\view;

use affiliate\component\Logger;
use system\components\Upload;
use system\components\Util;
use system\core\AffiliateController;
use Ufo\Model\Affiliate;

class ProfileView extends AffiliateController
{
    public function init()
    {

    }

    public function indexAction()
    {
        $this->pushTemplateData([
            'TEST' => 'Hello World',
        ]);
    }

    public function ajaxUpdate()
    {
        $oldPasswordHash = Affiliate::find($_SESSION[SESSION_KEY_CURRENT]['id'])->password;
        $notValidOldPassword = !password_verify(Util::sanitize($_POST['oldPassword']), $oldPasswordHash);

        if ($notValidOldPassword)
        {
            $this->jsonErrorData(['oldPassword' => 'Password is incorrect']);
        }

        $imgName = basename($_FILES["img"]["name"]);
        $newName = Upload::ajaxUploadImage($imgName, null, '/public/assets_affiliate');

        $data = [
            'wallet' => Util::sanitize($_POST['wallet']),
            'img' => '/public/assets_affiliate/'.$newName,
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