import {Controller} from "../../core/Controller";
import {Header} from "./Header";
import {Util} from "../../lib/Util";
import $ from "jquery";
import Swiper from 'swiper';
import {WOW} from "wowjs";


export class Home extends Controller {

    init() {
        super.init();
        new WOW({live: false}).init();
        Header.hamburger();
        Header.initAuth();
        Header.initSignUp();
        this.homeSwiper();
        this.homeMain();
        this.headerModal();
        this.initSignUp();

    }

    setStorage(key, value) {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem(key, value);
        }
    }

    getStorage(key, defaultValue) {
        if (typeof (Storage) !== "undefined") {
            const value = localStorage.getItem(key);

            if (value === undefined || isNaN(value) || !value) {
                return defaultValue;
            }

            return value;
        }

        return defaultValue;
    }

    homeSwiper() {
        let offersSwiper = new Swiper(".js_offers_swiper", {
            slidesPerView: 1.5,
            spaceBetween: 100,
            allowTouchMove: true,
            loop: true,
            loopedSlides: 50,
            breakpoints: {
                760: {
                    slidesPerView: 1.2,
                    spaceBetween: 20
                },
                1210: {
                    slidesPerView: 1.2,
                    spaceBetween: 15
                }
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        });

        let reviewsSwiper = new Swiper(".js_reviews_swiper", {
            slidesPerView: 2.7,
            spaceBetween: 40,
            allowTouchMove: true,
            loop: true,
            loopedSlides: 50,
            breakpoints: {
                760: {
                    slidesPerView: 1.2,
                    spaceBetween: 20
                },
                1210: {
                    slidesPerView: 1.5,
                    spaceBetween: 15
                }
            },
            scrollbar: {
                el: ".swiper-scrollbar",
                hide: true,
            },
            navigation: {
                nextEl: '.swiper-button-next-review',
                prevEl: '.swiper-button-prev-review'
            }
        });

    }

    homeMain() {

        $('.js_show_more').on('click', function () {
            $('.aff1liate-line.hidden').toggleClass('not-active');
            if ($('.aff1liate-line').css('width') == '100%') {
                $('.aff1liate-line').slideToggle(500);
            }
            $('.aff1liate-line').toggleClass('d-m-flex');
            $('.hidden-aff1liate').slideToggle(500);
            $('.js_show_more img').toggleClass('rotate');
        });

        $('.js_hover').hover(
            function () {
                $('.opacity-layer').fadeIn(400);
            }, function () {
                $('.opacity-layer').fadeOut(400);
            }
        );


    }

     initSignUp() {
        const signUpForm = $('.js_signup_form_home');
        const buttonSubmit = signUpForm.find('.js_signup_form_home_submit');
         this.signUpValidate();
        buttonSubmit.on('click', (event) => {
            event.preventDefault();
            signUpForm.submit();
        });

        signUpForm.on('submit', (e) => {
            e.preventDefault();
            this.signUpValidate();
        });

    }

     signUpValidate() {
        const home = this;
        $('.js_signup_form_home').validate(
            {
                onfocusout: true,
                submitHandler: function () {
                    home.signUpSubmit()
                }
            }
        );

        $.validator.methods.email = (value) =>
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);

        $.validator.addMethod('telegramValidate',
            (value) =>
                /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/.test(value),
            "This link invalid.");


        $.validator.addClassRules({
            userEmailSignUp: {
                required: true,
                email: true,
            },
            passwordSignUp: {
                minlength: 12,
                required: true,
            },
            password_repeat: {
                minlength: 12,
                required: true,
                equalTo: "#passwordSignUpHome",
            },
            firstNameSignUp: {
                minlength: 2,
                required: true,
            },
            lastNameSignUp: {
                minlength: 2,
                required: true,
            },
            telegramLink: {
                required: true,
                telegramValidate: true,
            },
        });
    }

     signUpSubmit() {
        const signUpForm = $('.js_signup_form_home');
        const errorMessage = $('.error-label', signUpForm);
        const buttonSubmit = signUpForm.find('.js_signup_form_home_submit');

        Util.ajax({
            url: '/affiliate/home/signup',

            data: new FormData(signUpForm[0]),
            processData: false,
            contentType: false
        }, response => {
            if (response.result === 'error') {

                Util.handleFormErrors(signUpForm, response);

                errorMessage.html(response.data.email ? response.data.email : "Invalid username or password");
                buttonSubmit.prop('disabled', false);

            } else {
                Util.changeLocation('/affiliate/home');
            }
        });
    }


}
