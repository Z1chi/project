import {Controller} from "../../core/Controller";
import 'jquery.scrollto';
import {Util} from "../../lib/Util";
import $ from "jquery";

export class Support extends Controller {
    init() {
        super.init();
        this.initAddSupport();
    }


    initAddSupport() {
        const $submitButton = $('.js_support_add_button');
        const $form = $('.js_support_add_form');
        const $result = $('.js_support_add_result');

        $submitButton
            .on('click', (event) => {
                event.preventDefault();
                $form.submit();
            });

        $form.on('submit', (event) => {
            event.preventDefault();

            Pace.restart();

            Util.ajax({
                url: this.url('/admins/addsupport'),
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
        });
    }

}