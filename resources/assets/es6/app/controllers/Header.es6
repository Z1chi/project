import {Controller} from "../../core/Controller";
import {Util} from "../../lib/Util";
import $ from "jquery";
import "jquery-validation";

export class Header extends Controller {

    init() {
        super.init();
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

    static initAuth() {
        this.authValidate();
        const authForm = $('.js_auth_form');
        const buttonSubmit = authForm.find('.js_auth_form_submit');

        buttonSubmit.on('click', (e) => {
            e.preventDefault();
            authForm.submit();
        });

        authForm.on('submit', (e) => {
            e.preventDefault();
            this.authValidate();
        });

        authForm.find('input[name=username]').focus();
        buttonSubmit.prop('disabled', true);

    };

    static authValidate() {
        const home = this;
        $('.js_auth_form').validate(
            {
                submitHandler: function () {
                    home.authSubmit()
                }
            }
        );

        $.validator.methods.email = (value) =>
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);

        $.validator.addClassRules({
            userEmailAuth: {
                required: true,
                email: true,
            },
            passwordAuth: {
                minlength: 12,
                required: true,
            }
        });
    }

    static authSubmit() {
        const authForm = $('.js_auth_form');
        const inputPassword = authForm.find('input[name=password]');
        const errorMessage = $('.error-label', authForm);
        const buttonSubmit = authForm.find('.js_auth_form_submit');
        Util.ajax({
                url: '/affiliate/home/auth',
                data: new FormData(authForm[0]),
                processData: false,
                contentType: false
            },
            response => {
                if (response.result === 'error') {
                    errorMessage.html("Invalid username or password");
                    inputPassword.val('');
                    inputPassword.focus();
                    buttonSubmit.prop('disabled', false);

                } else {
                    Util.changeLocation('/affiliate');
                }

                buttonSubmit.prop('disabled', false);
            });

    }

    static initSignUp() {
        this.signUpValidate();
        const signUpForm = $('.js_signup_form');
        const $buttonSubmit = signUpForm.find('.js_signup_form_submit');

        $buttonSubmit.on('click', (event) => {
            event.preventDefault();
            signUpForm.submit();
        });

        signUpForm.on('submit', (e) => {
            e.preventDefault();
            this.signUpValidate();
        });

    }

    static signUpValidate() {
        const home = this;
        $('.js_signup_form').validate(
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
                equalTo: "#passwordSignUp",
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

    static signUpSubmit() {
        const signUpForm = $('.js_signup_form');
        const errorMessage = $('.error-label', signUpForm);
        const buttonSubmit = signUpForm.find('.js_signup_form_submit');

        Util.ajax({
            url: '/affiliate/home/signup',

            data: new FormData(signUpForm[0]),
            processData: false,
            contentType: false
        }, response => {
            if (response.result === 'error') {

                Util.handleFormErrors(signUpForm, response);

                errorMessage.html("Invalid username or password");
                buttonSubmit.prop('disabled', false);

            } else {
                Util.changeLocation('/affiliate/home');
            }
        });
    }

}

