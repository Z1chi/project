import {Controller} from "../../core/Controller";
import {Util} from "../../lib/Util";
import $ from "jquery";
import "jquery-validation";




export class Support extends Controller {

    init() {
        super.init();
        this.findForm();
    }

    findForm() {

       const form =  [$('.js_supportInfo-form') , $('.js_support_add_form')].filter((oneForm)=> oneForm.length > 0);

        this.initChange(form[0])
    }

    initChange(form) {

        form.on('submit', (event) => {
            event.preventDefault();
            this.validateForm(form);
        });

        form.on('change', () => {
            event.preventDefault();
            this.validateForm(form)
        });
    }

    validateForm(form) {
        const support = this;
        form.validate(
            {
                rules: {
                    nameValidate: {
                        required: true,
                        minlength: 2,
                    },
                },
                submitHandler: function (value) {
                    const mapValidationToForm = {
                        "support/update": support.initUpdateSupport,
                        "support/add": support.initAddSupport,
                    };
                    const formId = value.getAttribute('data-form-id')
                    mapValidationToForm[formId].call(support);
                },
            }
        );

        $.validator.addMethod('telegramValidate',
            (value) =>
                /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/.test(value),
            "This link invalid.");

        $.validator.addClassRules({
            telegramLinkValidate: {
                required: true,
                telegramValidate: true,
            }
        });
    };

    initAddSupport() {
        const $form = $('.js_support_add_form');
        const $result = $('.js_support_add_result');
        Pace.restart();
        Util.ajax({
            url: this.url('/support/addsupport'),
            data: new FormData($form[0]),
            processData: false,
            contentType: false

        }, response => {
            if (response.result !== 'success') {
                $result.removeClass('hidden');
                $result.find('p').html(response.message);
            } else {
                Util.reload();
            }
            Pace.stop();
        });

    }

    initUpdateSupport() {
        const $form = $('.js_supportInfo-form');
        const $result = $('.js_supportInfo-result');
        Pace.restart();

        Util.ajax({
                url: this.url('/support/update'),
                data: new FormData($form[0]),
                processData: false,
                contentType: false
            },
            response => {
                if (response.result !== 'success') {
                    $result.removeClass('hidden');
                    $result.find('p').html(response.message);
                } else {
                    Util.reload();
                }
                Pace.stop();
            });
    }

}