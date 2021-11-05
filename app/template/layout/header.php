<header>
    <div class="container header-block">
        <div class="d-flex">
            <a href="/" class="logo">
                <img src="/assets/svg/trafburg.svg" alt="trafburg" height="48">
            </a>
            <div class="lang d-s-none">
                <div>en</div>
                <img src="/assets/svg/carret_down.svg" class="carret" height="5" alt="carrret_down">
                <div class="lang-select">
                    <div class="lng-item languages-en<?php if ($LANGUAGE == 'en'): ?> active<?php endif; ?>">en</div>
                    <div class="lng-item languages-ru<?php if ($LANGUAGE == 'ru'): ?> active<?php endif; ?>">ru</div>
                </div>
            </div>
        </div>
        <nav class="d-flex d-s-none">
            <ul class="d-flex font-400 h-100 main-nav">

                <li class="active">
                    <a href="<?= App::createUrl() ?>#why-choice-us" data-href="#why-choice-us" class="js-menu-item ">
                        why choise us
                    </a>

                </li>
                <li class="">
                    <a href="<?= App::createUrl() ?>#offers" data-href="#offers" class="js-menu-item ">
                        offers
                    </a>

                </li>
                <li class="">
                    <a href="<?= App::createUrl() ?>#how-it-work" data-href="#how-it-work" class="js-menu-item ">
                        how it work
                    </a>

                </li>
                <li class="">
                    <a href="<?= App::createUrl() ?>#statistic" data-href="#statistic" class="js-menu-item ">
                        statistic
                    </a>

                </li>
                <li class="">
                    <a href="<?= App::createUrl() ?>#reviews" data-href="#reviews" class="js-menu-item ">
                        reviews
                    </a>
                </li>
            </ul>
            <ul class="d-flex font-700 h-100 bg-margin-left">
                <li class="border-right">
                    <a href="javascript:void(0)" class="js_login_modal ">login</a>
                </li>
                <li>
                    <a href="javascript:void(0)" class="active js_sign_modal ">sign up</a>
                </li>
                <div class="active-line d-s-none"></div>
            </ul>
        </nav>

        <button class="hamburger d-s-block hamburger--squeeze js-hamburger" type="button">
			<span class="hamburger-box">
				  <span class="hamburger-inner"></span>
			</span>
        </button>
        <div class="mob-site-nav js_mob_site_nav">
            <nav>
                <ul>
                    <li class="menu-item active">
                        <a href="<?= App::createUrl() ?>#why-choice-us" data-href="#why-choice-us" class="js-menu-mobile-item js-menu-item ">
                            why choise us
                        </a>

                    </li>
                    <li class="menu-item">
                        <a href="<?= App::createUrl() ?>#offers" data-href="#offers" class="js-menu-mobile-item js-menu-item ">
                            offers
                        </a>

                    </li>
                    <li class="menu-item">
                        <a href="<?= App::createUrl() ?>#how-it-work" data-href="#how-it-work" class="js-menu-mobile-item js-menu-item">
                            how it work
                        </a>

                    </li>
                    <li class="menu-item">
                        <a href="<?= App::createUrl() ?>#statistic" data-href="#statistic" class="js-menu-mobile-item js-menu-item">
                            statistic
                        </a>

                    </li>
                    <li class="menu-item">
                        <a href="<?= App::createUrl() ?>#reviews" data-href="#reviews" class="js-menu-mobile-item js-menu-item ">
                            reviews
                        </a>

                    </li>
                </ul>
                <ul class="sing-block">
                    <li class="menu-item">
                        <a href="" class="js_login_modal js-menu-mobile-item ">sign in</a>

                    </li>
                    <li class="menu-item">
                        <a href="" class="js_sign_modal js-menu-mobile-item ">sign up</a>

                    </li>
                </ul>
            </nav>
        </div>
    </div>
</header>