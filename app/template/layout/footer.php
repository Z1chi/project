<?php
use Jaybizzle\CrawlerDetect\CrawlerDetect;
$CrawlerDetect = new CrawlerDetect;
?>

<footer>
    <div class="container">
        <div class="footer-top-line">
            <a href="javascript:void(0)" class="footer-logo">
                <img src="/img/logo-all-red.png" alt="">
            </a>

            <div class="footer-adress">
                <p class="footer-adress-desc eng-text">
                    Our address
                </p>
                <p class="footer-adress-desc rus-text">
                    Наш адрес
                </p>
                <p class="footer-adress-title eng-text">
                    190 High Road<br>Wood Green, London<br>United Kingdom
                </p>
                <p class="footer-adress-title rus-text">
                    United Knighdom,<br>London, Wood Green,<br>High Road 190
                </p>
            </div>

            <? if (false): ?>
            <div class="footer-socials">
                <p class="footer-socials-desc eng-text">
                    Follow us on social media.
                </p>
                <p class="footer-socials-desc rus-text">
                    Социальные сети, ждем в гости
                </p>

                <a href="javascript:void(0)">
                    <img src="/img/facebook.png" alt="">
                </a>
                <a href="javascript:void(0)">
                    <img src="/img/in.png" alt="">
                </a>
                <a href="javascript:void(0)">
                    <img src="/img/inst.png" alt="">
                </a>
                <a href="javascript:void(0)">
                    <img src="/img/vk.png" alt="">
                </a>
            </div>
            <? endif; ?>
        </div>

        <div class="footer-last-line">
            <p class="footer-last-line-c eng-text">
                © 2021 trafburg
            </p>
            <p class="footer-last-line-c rus-text">
                © 2021 trafburg
            </p>

            <ul class="footer-last-line-ul">
                <li>
                    <a href="<?=\system\components\Url::create('privacypolicy')?>" class="eng-text">
                        Privacy Policy
                    </a>
                    <a href="<?=\system\components\Url::create('privacypolicy')?>" class="rus-text">
                        Политика конфиденциальности
                    </a>
                </li>
                <li>
                    <a href="<?=\system\components\Url::create('terms')?>" class="eng-text">
                        Terms & Conditions
                    </a>
                    <a href="<?=\system\components\Url::create('terms')?>" class="rus-text">
                        Правила и условия
                    </a>
                </li>
                <li>
                    <a href="<?=\system\components\Url::create('agreement')?>" class="eng-text">
                        Client Agreement
                    </a>
                    <a href="<?=\system\components\Url::create('agreement')?>" class="rus-text">
                        Клиентское соглашение
                    </a>
                </li>
            </ul>
        </div>
    </div>
</footer>


<div class="hidden">
    <form action="" id="sing-in" class="js_auth_form" method="POST">
        <a id="close" href="javascript:void(0)" class="modal__back__wrapp__close mfp-close">
            <img src="/img/close.png" alt="">
        </a>
        <div class="sing-in-back"></div>
        <div class="sing-in-wrapp">
            <p class="sing-in-title eng-text">
                sign in
            </p>
            <p class="sing-in-title rus-text">
                вход
            </p>
            <div class="input-data input-data-hide">
                <input type="text" name="username">
                <label class="eng-text">e-mail <span class="error-label"></span></label>
                <label class="rus-text">электронная почта <span class="error-label"></span></label>
            </div>
            <div class="input-data input-data-hide">
                <input type="password" name="password">
                <label class="eng-text">password</label>
                <label class="rus-text">пароль</label>
                <a href="javascript:void(0)"><img src="/img/sleep.png" alt=""></a>
            </div>
            <p class="sing-in-under-inputs eng-text">
                forget password?
            </p>
            <p class="sing-in-under-inputs rus-text">
                забыли пароль?
            </p>

            <a href="#" class="sing-in-submit js_auth_form_submit">
                <p class="eng-text">sing in</p>
                <p class="rus-text">войти</p>
                <img src="/img/reviews-arrow.png" alt="">
            </a>
        </div>

        <input type="submit" style="position: absolute; left: -9999px; display: none; width: 0; height: 0"/>
    </form>
</div>

<div class="hidden">
    <form action="" id="sign-up" method="POST" class="js_signup_form">
        <a id="close2" href="javascript:void(0)" class="modal__back__wrapp__close mfp-close">
            <img src="/img/close.png" alt="">
        </a>
        <div class="sign-up-back"></div>
        <div class="sign-up-wrapp">
            <p class="sing-in-title eng-text">
                sign up
            </p>
            <p class="sing-in-title rus-text">
                регистрация
            </p>
            <div class="sign-up-container">
                <div class="sign-up-container-wrapp">
                    <div class="input-data input-data-hide">
                        <input type="text" name="email">
                        <label class="eng-text">e-mail</label>
                        <label class="rus-text">электронная почта</label>
                    </div>
                    <div class="input-data input-data-hide">
                        <input type="text" name="first_name">
                        <label class="eng-text">name</label>
                        <label class="rus-text">имя</label>
                    </div>
                    <div class="input-data input-data-hide">
                        <input type="text" name="last_name">
                        <label class="eng-text">last name</label>
                        <label class="rus-text">фамилия</label>
                    </div>
                </div>
                <div class="sign-up-container-wrapp">
                    <div class="input-data input-data-hide">
                        <input type="text" name="telegram">
                        <label class="eng-text">telegram</label>
                        <label class="rus-text">telegram</label>
                    </div>
                    <div class="input-data input-data-hide">
                        <input type="password" name="password">
                        <label class="eng-text">password</label>
                        <label class="rus-text">пароль</label>
                        <img src="/img/sleep.png" alt="">
                    </div>
                    <div class="input-data input-data-hide">
                        <input type="password" name="password_repeat">
                        <label class="eng-text">re-entry password</label>
                        <label class="rus-text">пароль ещё раз</label>
                        <img src="/img/sleep.png" alt="">
                    </div>
                </div>
            </div>

            <p class="sing-in-under-inputs eng-text">
                By pressing the button you <a href="javascript:void(0)">confirm terms</a>
            </p>
            <p class="sing-in-under-inputs rus-text">
                Нажимая кнопу вы соглашаетесь c <a href="javascript:void(0)"> условиями и правилами</a>
            </p>

            <a href="javascript:void(0)" class="sing-in-submit">
                <p class="eng-text">create account</p>
                <p class="rus-text">создать аккаунт</p>
                <img src="/img/reviews-arrow.png" alt="">
            </a>
        </div>

        <input type="submit" style="position: absolute; left: -9999px; display: none; width: 0; height: 0"/>
    </form>
</div>

<div class="hidden">
    <form action="" id="cheers">
        <a id="close" href="javascript:void(0)" class="modal__back__wrapp__close mfp-close">
            <img src="/img/close.png" alt="">
        </a>
        <div class="sing-in-back"></div>
        <div class="sing-in-wrapp">
            <div class="error-wrapp">
                <img src="/img/cheers.png" alt="">
                <div class="erroe-wrapp-text">
                    <p class="erroe-wrapp-text-title">
                        cheers!
                    </p>
                    <p class="erroe-wrapp-text-desc">
                        new account has<br>been created
                    </p>
                </div>
            </div>
            <a href="javascript:void(0)" class="error-wrapp-btn">
                ok
            </a>
        </div>
    </form>
</div>

<div class="hidden">
    <form action="" id="oops">
        <a id="close" href="javascript:void(0)" class="modal__back__wrapp__close mfp-close">
            <img src="/img/close.png" alt="">
        </a>
        <div class="sing-in-back"></div>
        <div class="sing-in-wrapp">
            <div class="error-wrapp">
                <img src="/img/oops.png" alt="">
                <div class="erroe-wrapp-text">
                    <p class="erroe-wrapp-text-title">
                        oops!
                    </p>
                    <p class="erroe-wrapp-text-desc">
                        some wrong, may you try<br>again?
                    </p>
                </div>
            </div>
            <a href="javascript:void(0)" class="error-wrapp-btn">
                <img src="/img/oops-back.png" alt="">
                try again
            </a>
        </div>
    </form>
</div>

<script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
        crossorigin="anonymous"></script>
<script src="/js/jquery.magnific-popup.min.js?<?=$MTIME_JS?>"></script>
<script src="/js/owl.carousel.min.js?<?=$MTIME_JS?>"></script>
<script src="/js/wow.min.js?<?=$MTIME_JS?>"></script>
<script src="/js/jquery.formstyler.min.js?<?=$MTIME_JS?>"></script>
<script src="/js/main.js?<?=$MTIME_JS?>"></script>
<? if (PRODUCTION && getenv('JIVO_CHAT_KEY')): ?>
    <script src="//code.jivosite.com/widget/<?=getenv('JIVO_CHAT_KEY')?>" async></script>
<? endif; ?>

</body>
</html>
