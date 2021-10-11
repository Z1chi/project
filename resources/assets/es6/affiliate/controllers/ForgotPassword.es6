import {Controller} from "../../core/Controller";
import 'jquery.scrollto';
import { Util } from "../../lib/Util";
import $ from "jquery";

export class ForgotPassword extends Controller {
    init ()
    {
        super.init();

        this.initChangePassword();
    }

    initChangePassword()
    {
        console.log("asdasd");
        const $submitButton = $('.js_forgot_password_button');
        const $form = $('.js_forgot_form');
        const $result = $('.js_forgot_messages');

        $submitButton
            .on('click', (event) => {
                event.preventDefault();
                $form.submit();
            });

        $form.on('submit', (event) =>
        {
            event.preventDefault();

            Pace.restart();

            Util.ajax({url: this.url('/home/forgot'), data: $form.serialize() }, response =>
            {
                $result.removeClass('hidden');
                $result.find('p').html(response.message);

                Pace.stop();
            });
        });
    }
}