import {Controller} from "../../core/Controller";
import {Util} from "../../lib/Util";
import $ from "jquery";

export class Header extends Controller {

    init() {
        super.init();
    }

    static changeLanguage() {
        let body = $('body');

        $('.languages-ru').on('click', function () {
            body.addClass('body-ru');
            body.removeClass('body-en');
            $('.lang div').removeClass('active');
            $(this).addClass('active');
            Util.setCookie('language', 'ru', 365);
        });

        $('.languages-en').on('click', function () {
            body.addClass('body-en');
            body.removeClass('body-ru');
            $('.lang div').removeClass('active');
            $(this).addClass('active');
            Util.setCookie('language', 'en', 365);
        })
    }

    static hamburger() {
        let $hamburger = $(".hamburger");

        let actionHamburger = () => {
            $hamburger.toggleClass("is-active");
            $('body').toggleClass("overflow");
            $('.js_mob_site_nav').toggleClass("active");
            $('.js_section .container').toggleClass("visibility-hidden");
        };

        $hamburger.on("click", function () {
            actionHamburger();
        });

        $('.js-menu-mobile-item').on('click', function (e) {
            // e.preventDefault();
            actionHamburger();
        });

        $('.js-menu-item').on('click', function () {
            let elementClick = $(this).data("href");
            if ($(elementClick).length > 0) {
                let destination = $(elementClick).offset().top;
                $('html').animate({scrollTop: destination}, 1000)
            }
        });


    };

}

