import {Controller} from "../../core/Controller";
import {Util} from "../../lib/Util";
import $ from "jquery";
import "jquery-validation";

export class Profile extends Controller {
    init() {
        super.init();
        this.initChange();
    }

    validateForm() {
        const profile = this;
        $('.js_profile_changes').validate(
            {
                // success: function (label) {
                //     label.addClass("valid").text("OK")
                // },
                rules: {
                    userEmail: {
                        email: true,
                        required: true
                    }
                },
                submitHandler: function () {
                    profile.submitChange();
                }
            }
        );
        $.validator.addClassRules({

            password: {
                required: true,
                minlength: 2
            },
            wallet: {
                required: true,
                minlength: 5,
            },
            name: {
                required: true,
                minlength: 2
            },
        });
    };

    initChange() {

        $('.buttonSubmit').on('submit', (event) => {
            event.preventDefault();
            this.validateForm();
        });

        $('.js_profile_changes').on('change', () => {
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
                    Util.handleBootstrapErrors($createForm, response);
                } else {
                    Util.reload();
                }
            });

    }
}

