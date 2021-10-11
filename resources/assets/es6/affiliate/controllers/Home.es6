import {Controller} from "../../core/Controller";
import {Util} from "../../lib/Util";
import $ from "jquery";
import "jquery-validation";

export class Home extends Controller {
    init() {
        super.init();

        this.initSignup();
        this.initRecoveryPassword();
        this.initForgotPassword();
    }

    initSignup() {
        const $form = $('.js_signup_form');

        $form.on('submit', (event) => {
            event.preventDefault();

            Util.ajax({url: this.url('/home/signup'), data: $form.serialize()}, response => {
                if (response.result === 'error') {

                    Util.handleBootstrapErrors($form, response);

                } else {
                    Util.changeLocation(this.url('/home'));
                }
            });
        });
    }

    initForgotPassword() {   // Форма отправки Email на восстановление пароля
        const $form = $('.js_forgot_form');
        const $result = $('.js_forgot_messages');

        $.validator.methods.email = (value) =>
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);

        $form
            .on('submit', (event) => {
                event.preventDefault();
                validateForm();
            });

        $form.on('change', (event) => {
            event.preventDefault();
            validateForm();
        });

        const validateForm = () => {
            return $form.validate( //Валидация
                {
                    rules: {
                        userEmail: {
                            required: true,
                            email: true,
                        },
                    },
                    submitHandler: function () {
                        submitForm();
                    }
                }
            )
        };

        const submitForm = () => {
            Pace.restart();

            Util.ajax({url: this.url('/home/forgot'), data: $form.serialize()}, response => {
                Pace.stop();
                if (response.result === 'error') {
                    $result.removeClass('hidden');
                    $result.find('p').html(response.message);
                } else {
                    $result.removeClass('hidden');
                    $result.find('p').html(response.result);
                }
            });
        }
    }


    initRecoveryPassword() {
        const $form = $('.js_recovery_form');
        const $result = $('.js_recovery_messages');

        $form
            .on('submit', (event) => {
                event.preventDefault();

                validateForm();
            });

        $form.on('change', (event) => {
            event.preventDefault();
            validateForm();
        });

        $.validator.addClassRules({  //Добавление правил валидации
            newPassword: {
                required: true,
                minlength: 12,
            },
            confirmPassword: {
                required: true,
                minlength: 12,
                equalTo: "#newPassword",
            },
        });

        const validateForm = () => {

            return $form.validate( //Валидация
                {
                    submitHandler: function () {
                        submitForm();
                    }
                }
            )
        };

        const submitForm = () => {

            Pace.restart();
            Util.ajax({url: this.url('/home/recovery'), data: $form.serialize()}, response => {
                Pace.stop();
                if (response.result === 'error') {
                    $result.removeClass('hidden');
                    $result.find('p').html(response.message);
                } else {
                    document.location.href = this.url("");
                }
            });
        };


    }
}