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
                        <a href="<?=\system\components\Url::create('privacypolicy')?>">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="<?=\system\components\Url::create('terms')?>">Terms & conditions</a>
                    </li>
                    <li>
                        <a href="<?=\system\components\Url::create('agreement')?>">Client agreement</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</footer>


<div class="modal login-modal" style="display: none;">
    <form class="modal-dialog js_auth_form" action="" id="sing-in"  method="POST">
        <div class="modal-content small-modal">
            <div class="modal-header pos-relative">
                <img src="/assets/svg/close.svg" class="btn-close js_close_modal" alt="close">
            </div>
            <div class="modal-body">
                <div class="modal-title">sign in</div>
                <div class="form-block">
                    <div class="form-group w-100">
                        <input type="text" name="username" required>
                        <label for="email">e-mail</label>
                    </div>
                </div>
                <div class="form-block">
                    <div class="form-group w-100">
                        <img src="/assets/svg/eye-view.svg" class="js_view_pass" alt="eye-view">
                        <input type="password"  name="password" required>
                        <label for="password">password</label>
                    </div>
                </div>
                <div class="caption"><a href="#" class="term">forget password</a></div>
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
                        <input type="text" name="email" required>
                        <label for="email">e-mail</label>
                    </div>
                    <div class="form-group error">
                        <input type="text" name="last_name" required>
                        <label for="name">name</label>
                    </div>
                    <div class="form-group">
                        <input type="text" name="telegram" required>
                        <label for="telegram">telegram</label>
                    </div>
                    <div class="form-group">
                        <input type="text" name="telegram-account" required>
                        <label for="telegram-account">telegram account</label>
                    </div>
                    <div class="form-group">
                        <img src="/assets/svg/eye-view.svg" class="js_view_pass" alt="eye-view">
                        <input type="password"  name="password" required>
                        <label for="password">password</label>
                    </div>
                    <div class="form-group">
                        <img src="/assets/svg/eye-view.svg" class="js_view_pass" alt="eye-view">
                        <input type="password" name="password_repeat" required>
                        <label for="re-enter-pass">re-entry password</label>
                    </div>
                </div>
                <div class="caption">If you push the button you <a href="#" class="term">confirm terms</a></div>
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

<script src="/assets/js/bundle.js?<?=$MTIME_JS?>"></script>
<? if (PRODUCTION && getenv('JIVO_CHAT_KEY')): ?>
    <script src="//code.jivosite.com/widget/<?=getenv('JIVO_CHAT_KEY')?>" async></script>
<? endif; ?>

</body>
</html>
