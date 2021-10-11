import {Controller} from "../../core/Controller";
import 'jquery.scrollto';
import { Util } from "../../lib/Util";
import $ from "jquery";

export class RecoveryPassword extends Controller {
    init ()
    {
        super.init();

        this.initChangePassword();
    }

    initChangePassword()
    {
        console.log("asdasd");
        const $submitButton = $('.js_recovery_password_button');
        const $form = $('.js_recovery_form');
        const $result = $('.js_recovery_messages');

        $submitButton
            .on('click', (event) => {
                event.preventDefault();
                $form.submit();
            });

        $form.on('submit', (event) =>
        {
            event.preventDefault();

            Pace.restart();

            Util.ajax({url: this.url('/home/recovery'), data: $form.serialize() }, response =>
            {
                $result.removeClass('hidden');
                $result.find('p').html(response.message);

                Pace.stop();
            });
        });
    }
}