import {Controller} from "../../core/Controller";
import {Util} from "../../lib/Util";
import $ from "jquery";

export class Home extends Controller {
	init ()
	{
		super.init()

		this.initSignup();
	}

	initSignup ()
	{
		const $form = $('.js_signup_form');

		$form.on('submit', (event) => {
			event.preventDefault();

			Util.ajax({url: this.url('/home/signup'), data: $form.serialize() }, response =>
			{
				if (response.result === 'error') {

					Util.handleBootstrapErrors($form, response);

				} else {
					Util.changeLocation(this.url('/home'));
				}
			});
		});
	}
}