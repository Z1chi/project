import {Controller} from "../../core/Controller";
import { Util } from "../../lib/Util";
import $ from "jquery";

export class Profile extends Controller {
    init() {
        super.init();

        this.initChange();
        this.initDelete();
    }

    initChange() {
        const $createForm = $('.js_profile_changes');

        $createForm.on('submit', (event) => {
            event.preventDefault();

            Util.ajax({url: this.url('/profile/update'), data: $createForm.serialize()}, response => {
                debugger
                if (response.result === 'error') {

                    Util.handleBootstrapErrors($createForm, response);

                } else {
                    Util.reload();
                }
            });
        });
    }
}

