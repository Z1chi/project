<?php
declare(strict_types=1);

namespace Ufo\Service;

use App;
use PHPUnit\Exception;
use system\components\Url;
use system\core\Template;

class RecoveryTokenService
{
    public function sendRecoveryMail($email, $token): bool
    {
        $url = Url::createRaw('/?token=' . $token. '&start=recovery');

        $tpl_file = SYSTEM . '/template/email/recovery_password.php';
        $tpl = new Template($tpl_file);

        $tpl->init([
            'BUTTON_URL' => $url,
            'TITLE' => 'recovery_email_title',
            'TEXT' => 'recovery_email_text',
            'BUTTON_TEXT' => 'recovery_email_button_text',
            'APP_NAME' => 'Affiliate',
            'YEAR' => date('Y'),
            'URL_ASSETS' => App::getEmailAssetsUrl(),
            'TEXT_TIP' => '',
            'TEXT_TEAM' => 'email_project_team',
        ]);

        $html = $tpl->render();

        $mail = App::getMailer();

        $mail->addAddress($email);
        $mail->Subject = 'recovery_subject';
        $mail->MsgHTML($html);

        try {
            $mail->send();
        } catch (phpmailerException $e) {
//			Log::e('phpmailerException', $e->errorMessage());
            return false;
        } catch (\PHPMailer\PHPMailer\Exception $e) {

        }
        $gello = $mail->ErrorInfo;
        return true;
    }
}