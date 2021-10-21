<?php

use Jaybizzle\CrawlerDetect\CrawlerDetect;

$CrawlerDetect = new CrawlerDetect;
?>

<footer class="footer-bg bg">
    <div class="container">
        <div class="d-flex content-space-between footer-line">
            <a href="#" class="logo d-m-none">
                <img src="/assets/svg/trafburg-red.svg" width="205" alt="trafburg-red">
            </a>
            <div class="address-block">
                <div class="font-400 f-small">Our address</div>
                <div class="font-400 f-normal">United Knighdom, <br> London, Wood Green, <br> High Road 190</div>
            </div>
            <div class="social-block d-flex">
                <div class="title">Follow us in social <br> networks</div>
                <div class="d-flex">
                    <div class="circle">
                        <img src="/assets/svg/facebook.svg" alt="facebook">
                    </div>
                    <div class="circle">
                        <img src="/assets/svg/linked-in.svg" alt="linked-in">
                    </div>
                    <div class="circle">
                        <img src="/assets/svg/instagram.svg" alt="instagram">
                    </div>
                    <div class="circle">
                        <img src="/assets/svg/vk.svg" alt="vk">
                    </div>
                </div>
            </div>
            <div class="logo-mob">
                <a href="/">
                    <img src="/assets/svg/trafburg-red.svg" width="205" alt="trafburg-red">
                </a>
            </div>
        </div>
        <div class="footer-nav d-flex">
            <div class="copyright">© 2021 trafburg</div>
            <nav>
                <ul class="d-flex">
                    <li>
                        <a href="<?= \system\components\Url::create('privacypolicy') ?>">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="<?= \system\components\Url::create('terms') ?>">Terms & conditions</a>
                    </li>
                    <li>
                        <a href="<?= \system\components\Url::create('agreement') ?>">Client agreement</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</footer>


<div class="modal login-modal" style="display: none;">
    <form class="modal-dialog js_auth_form" action="" id="sing-in" method="POST">
        <div class="modal-content small-modal">
            <div class="modal-header pos-relative">
                <img src="/assets/svg/close.svg" class="btn-close js_close_modal" alt="close">
            </div>
            <div class="modal-body">
                <div class="modal-title">sign in</div>
                <div class="form-block">
                    <div class="form-group w-100">
                        <input type="text" name="login" class="userEmailAuth" required>
                        <div class="labelForm">e-mail</div>
                    </div>
                </div>
                <div class="form-block">
                    <div class="form-group w-100">
                        <img src="/assets/svg/eye-view.svg" class="js_view_pass" alt="eye-view">
                        <input type="password" name="password" class="passwordAuth" required>
                        <div class="labelForm">password</div>
                    </div>
                </div>
                <div class="caption caption__signIn">
                    <a href="<?= App::getBaseUrl() . "/affiliate/?start=forgot" ?>" class="term">forget password</a>
                    <label class="error-label"></label>
                </div>
                <a href="" class="d-flex sign-center-block js_auth_form_submit">
                    <div class="title">sign in</div>
                    <img src="/assets/svg/arrow-right.svg" height="47" alt="arrow-right">
                </a>
            </div>
        </div>
        <input type="submit" style="position: absolute; left: -9999px; display: none; width: 0; height: 0"/>
    </form>

    <div class="modal-backdrop"></div>
</div>

<div class="modal sign-modal" style="display: none;">
    <form class="modal-dialog js_signup_form" action="" id="" method="POST">
        <div class="modal-content large-modal">
            <div class="modal-header pos-relative">
                <img src="/assets/svg/close.svg" class="btn-close js_close_modal" alt="close">
            </div>
            <div class="modal-body">
                <div class="modal-title">sign up</div>
                <div class="form-block">
                    <div class="form-group">
                        <input type="text" name="first_name" class="firstNameSignUp" required>
                        <div class="labelForm">first name</div>
                    </div>
                    <div class="form-group">
                        <input class="lastNameSignUp" type="text" name="last_name" required>
                        <div class="labelForm">last name</div>
                    </div>
                    <div class="form-group">
                        <input type="text" name="email" class="userEmailSignUp" required>
                        <div class="labelForm">e-mail</div>
                    </div>
                    <div class="form-group">
                        <input type="text" name="telegram" class="telegramLink" required>
                        <div class="labelForm">telegram</div>
                    </div>
                    <div class="form-group">
                        <img src="/assets/svg/eye-view.svg" class="js_view_pass" alt="eye-view">
                        <input type="password" name="password" id="passwordSignUp" class="passwordSignUp" required>
                        <div class="labelForm">password</div>
                    </div>
                    <div class="form-group">
                        <img src="/assets/svg/eye-view.svg" class="js_view_pass" alt="eye-view">
                        <input type="password" name="password_repeat" class="password_repeat" required>
                        <div class="labelForm">re-entry password</div>
                    </div>
                </div>
                <div class="caption form__error-wrapper">
                    <p>If you push the button you
                    <a href="<?= \system\components\Url::create('terms') ?>" target="_blank" class="term">confirm terms</a>
                    </p>
                    <label class="error-label"></label>
                </div>
                <a class="d-flex sign-center-block js_signup_form_submit">
                    <div class="title">create account</div>
                    <img src="/assets/svg/arrow-right.svg" height="47" alt="arrow-right">
                </a>
            </div>
        </div>
        <input type="submit" style="position: absolute; left: -9999px; display: none; width: 0; height: 0"/>
    </form>

    <div class="modal-backdrop"></div>
</div>

<div class="modal" style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content large-modal">
            <div class="modal-header pos-relative">
                <img src="/assets/svg/close.svg" class="btn-close js_close_modal" alt="close">
            </div>
            <div class="modal-body">
                <div class="d-flex block">
                    <img src="/assets/svg/user-success.svg" height="91" alt="user-success">
                    <div>
                        <div class="modal-title">cheers!</div>
                        <div class="modal-subtitle">new account has <br> been created</div>
                    </div>
                </div>

                <div class="d-flex sign-center-block border-green">
                    <div class="title">ok</div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal-backdrop"></div>
</div>

<div class="modal" style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content large-modal">
            <div class="modal-header pos-relative">
                <img src="/assets/svg/close.svg" class="btn-close js_close_modal" alt="close">
            </div>
            <div class="modal-body">
                <div class="d-flex block">
                    <img src="/assets/svg/fail.svg" height="70" alt="fail">
                    <div>
                        <div class="modal-title">oops!</div>
                        <div class="modal-subtitle">some wrong, may you try <br> again?</div>
                    </div>
                </div>

                <div class="d-flex sign-center-block border-red">
                    <img src="/assets/svg/arrow-right.svg" height="47" alt="arrow-right">
                    <div class="title">try again</div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal-backdrop"></div>
</div>

<script src="/assets/js/bundle.js?<?= $MTIME_JS ?>"></script>
<? if (PRODUCTION && getenv('JIVO_CHAT_KEY')): ?>
    <script src="//code.jivosite.com/widget/<?= getenv('JIVO_CHAT_KEY') ?>" async></script>
<? endif; ?>

</body>
</html>
