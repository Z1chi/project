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
        $notValidOldPassword = !password_verify(Util::sanitize($_POST['old_password']), $oldPasswordHash);

        if ($notValidOldPassword)
        {
            $this->jsonErrorData(['old_password' => 'Password is incorrect']);
        }

        $img_name = basename($_FILES["img"]["name"]);
        $new_name = Upload::ajaxUploadImage($img_name, null, '/public/assets_affiliate');

        $data = [
            'wallet' => Util::sanitize($_POST['wallet']),
            'img' => '/public/assets_affiliate/'.$new_name,
            'email' => Util::sanitize($_POST['email']),
            'password' => password_hash(Util::sanitize($_POST['new_password']), PASSWORD_BCRYPT),
            'telegram' => Util::sanitize($_POST['telegram']),
            'first_name' => Util::sanitize($_POST['first_name']),
            'last_name' => Util::sanitize($_POST['last_name']),
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