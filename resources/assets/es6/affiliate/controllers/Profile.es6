import {Controller} from "../../core/Controller";
import {Util} from "../../lib/Util";
import $ from "jquery";
import "jquery-validation";
import {validate as bitcoin} from 'bitcoin-address-validation';

export class Profile extends Controller {
    init() {
        super.init();
        this.initChange();
    }

    validateForm() {

        const profile = this;
        $('.js_profile_changes').validate(
            {
                rules: {
                    userEmail: {
                        required: true,
                        email: true,
                    },
                },
                submitHandler: function () {
                    profile.submitChange();
                }
            }
        );

        $.validator.addMethod('bitcoinValidate',
            (val) => bitcoin(val), "This wallet invalid.");

        $.validator.methods.email = (value) =>
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);

        $.validator.addClassRules({

            newPassword: {
                minlength: 12,
            },
            password_confirm: {
                minlength: 12,
                equalTo: "#newPassword",
            },
            oldPassword: {
                minlength: 1,
            },
            wallet: {
                required: true,
                minlength: 5,
                bitcoinValidate: true
            },
            name: {
                required: true,
                minlength: 2
            },
        });
    };

    initChange() {
        const form = $('.js_profile_changes');
        form.on('submit', (event) => {
            event.preventDefault();
            this.validateForm();
        });

        form.on('change', () => {
            this.validateForm();
        });
    }

    submitChange() {

        const $createForm = $('.js_profile_changes');
        Util.ajax({
                url: this.url('/profile/update'),
                data: new FormData($createForm[0]),
                processData: false,
                contentType: false
            },
            response => {
                if (response.result === 'error') {
                    this.oldPasswordError (!response.data.oldPassword);
                    Util.handleBootstrapErrors($createForm, response);
                } else {
                    Util.reload();
                }
            });

    }

    oldPasswordError(props) {
        const span = $('#oldPasswordError');
        !props ? span.removeClass('profile__form__errorOldPassword') : span.addClass('profile__form__errorOldPassword')
    }


}

