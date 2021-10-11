<?php
declare(strict_types=1);

namespace Ufo\Service;

use App;
use PHPUnit\Exception;
use system\components\Url;
use system\core\Template;
use Ufo\Model\RecoveryToken;

class RecoveryTokenService
{
    public function sendRecoveryMail($email, $token): bool
    {
        $url = Url::createRaw('/?token=' . $token . '&start=recovery');

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
        $mail->Subject = 'Password recovery';
        $mail->MsgHTML($html);

        try {
            $mail->send();
        } catch (\PHPMailer\PHPMailer\Exception $e) {
            return false;
        }

        return true;
    }

    public function sendToken($email): array
    {
        $result = [
            'message' => [],
            'success' => false
        ];

        $affiliate = \Ufo\Model\Affiliate::firstWhere('email', $email);
        if (empty($affiliate)) {
            $result['message'] = "There is no such user";
            return $result;
        }

        $token = new RecoveryToken();
        $token->affiliate_id = $affiliate->id;
        $tokenStr = bin2hex(random_bytes(16));
        $token->token = $tokenStr;

        if (!$token->save()) {
            $result['message'] = "Token hasn't been saved";
            return $result;
        }

        $recoveryService = new RecoveryTokenService();
        if (!$recoveryService->sendRecoveryMail($email, $tokenStr)) {
            $result['message'] = "Message hasn't been sent";
            return $result;

        }

        $result['success'] = true;
        return $result;
    }

    public function changePasswordByToken($token): array
    {
        $result = [
            'success' => false,
            'message' => []
        ];

        $token = RecoveryToken::where(['token' => $token])->first();
        if (empty($token)) {
            $result['message'] = "Token doesn't exist";
            return $result;
        }

        $created_at = $token->created_at;
        $now = new \DateTime();
        $diff = $now->diff($created_at)->h;

        if ($diff >= 1) {
            // Token lifetime(1h) is over
            $token->delete();
            $result['message'] = "Token is expired";
            return $result;
        }

        $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
        $affiliate = \Ufo\Model\Affiliate::find($token->affiliate_id);
        if (empty($affiliate)) {
            $result['message'] = "No such affiliate";
            return $result;
        }

        $affiliate->password = $password;
        if (!$affiliate->save()) {
            $result['message'] = "New password hasn't been saved";
            return $result;
        }

        // delete all tokens
        RecoveryToken::where('affiliate_id', $affiliate->id)->delete();
        $result['success'] = true;

        return $result;
    }
}
