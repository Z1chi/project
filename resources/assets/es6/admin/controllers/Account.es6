import {Controller} from "../../core/Controller";
import 'jquery.scrollto';
import { Util } from "../../lib/Util";
import $ from "jquery";

export class Account extends Controller {
	init ()
	{
		super.init();

		const $container = $('.js_admin');
		this.admin_id = $container.data('admin-id');

		this.initChangePassword();
	}

	initChangePassword()
	{
		const $submitButton = $('.js_change_password_button');
		const $form = $('.js_change_password_form');
		const $result = $('.js_change_password_result');

		$submitButton
			.on('click', (event) => {
				event.preventDefault();
				$form.submit();
			});

		$form.on('submit', (event) =>
		{
			event.preventDefault();

			Pace.restart();

			Util.ajax({url: this.url('/account/change'), data: $form.serialize() }, response =>
			{
				$result.removeClass('hidden');
				$result.find('p').html(response.message);

				Pace.stop();
			});
		});
	}
}