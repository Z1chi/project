<div class="main-screen__header-second-wrapp">
    <ul id="menu" class="main-screen__ul">
        <li>
            <a href="<?=App::createUrl()?>#why-choice-us" class="eng-text">
                why choise us
            </a>
            <a href="<?=App::createUrl()?>#why-choice-us" class="rus-text">
                о нас
            </a>
        </li>
        <li>
            <a href="<?=App::createUrl()?>#offers" class="eng-text">
                offers
            </a>
            <a href="<?=App::createUrl()?>#offers" class="rus-text">
                предложения
            </a>
        </li>
        <li>
            <a href="<?=App::createUrl()?>#how-it-work" class="eng-text">
                how it work
            </a>
            <a href="<?=App::createUrl()?>#how-it-work" class="rus-text">
                как это<br>работает
            </a>
        </li>
        <li>
            <a href="<?=App::createUrl()?>#statistic" class="eng-text">
                statistic
            </a>
            <a href="<?=App::createUrl()?>#statistic" class="rus-text">
                статистика
            </a>
        </li>
        <li>
            <a href="<?=App::createUrl()?>#reviews" class="eng-text">
                reviews
            </a>
            <a href="<?=App::createUrl()?>#reviews" class="rus-text">
                отзывы
            </a>
        </li>
    </ul>

    <div class="languages">
        <a href="javascript:void(0)" class="languages-ru<?php if ($LANGUAGE == 'ru'): ?> active<?php endif; ?>">
            RU
        </a>
        <a href="javascript:void(0)" class="languages-en<?php if ($LANGUAGE == 'en'): ?> active<?php endif; ?>">
            EN
        </a>
        <img src="/img/prev-arrow.png" alt="">
    </div>

    <div class="main-screen__log-wrapp">
        <a href="#sing-in" class="popup main-screen__login eng-text">
            login
        </a>
        <a href="#sing-in" class="popup main-screen__login rus-text">
            войти
        </a>
        <span></span>
        <a href="#sign-up" class="popup main-screen__sing-up eng-text">
            sign up
        </a>
        <a href="#sign-up" class="popup main-screen__sing-up rus-text">
            зарегистрироваться
        </a>
    </div>
</div>

<div class="main-screen-header-mob">
    <div class="main-screen-header-mob-top">
        <a href="javascript:void(0)" class="main-screen-header-mob-top-logo">
            <img src="/img/logo-all.png" alt="">
        </a>
        <div class="languages">
            <a href="javascript:void(0)" class="languages-ru active">
                RU
            </a>
            <a href="javascript:void(0)" class="languages-eng">
                ENG
            </a>
            <img src="/img/prev-arrow.png" alt="">
        </div>
        <a href="javascript:void(0)" class="main-screen-header-mob-top-menu">
            <span></span>
            <span></span>
            <span></span>
        </a>
    </div>
    <div class="main-screen-header-mob-open-wrapp">
        <div class="main-screen-header-mob-open-wrapp-wrapp">
            <ul class="main-screen__ul-mob" id="menu2">
                <li>
                    <a href="<?=App::createUrl()?>#why-choice-us" class="eng-text">
                        why choise us
                    </a>
                    <a href="<?=App::createUrl()?>#why-choice-us" class="rus-text">
                        о нас
                    </a>
                </li>
                <li>
                    <a href="<?=App::createUrl()?>#offers" class="eng-text">
                        offers
                    </a>
                    <a href="<?=App::createUrl()?>#offers" class="rus-text">
                        предложения
                </li>
                <li>
                    <a href="<?=App::createUrl()?>#how-it-work" class="eng-text">
                        how it work
                    </a>
                    <a href="<?=App::createUrl()?>#how-it-work" class="rus-text">
                        как это<br>работает
                    </a>
                </li>
                <li>
                    <a href="<?=App::createUrl()?>#statistic" class="eng-text">
                        statistic
                    </a>
                    <a href="<?=App::createUrl()?>#statistic" class="rus-text">
                        статистика
                    </a>
                </li>
                <li>
                    <a href="<?=App::createUrl()?>#reviews" class="eng-text">
                        reviews
                    </a>
                    <a href="<?=App::createUrl()?>#reviews" class="rus-text">
                        отзывы
                    </a>
                </li>
            </ul>
            <a href="#sing-in" class="popup header-mob-btn eng-text">
                sing in
            </a>
            <a href="#sing-in" class="popup header-mob-btn rus-text">
                войти
            </a>
            <a href="#sign-up" class="popup header-mob-btn eng-text">
                sign up
            </a>
            <a href="#sign-up" class="popup header-mob-btn rus-text">
                зарегистироваться
            </a>
        </div>

    </div>
</div>