import {Controller} from "../../core/Controller";
import $ from 'jquery';
import {Util} from "../../lib/Util";

export class Withdraw extends Controller {
	init ()
	{
		super.init();

		const $withdrawBtc = $('.js_form_withdraw_btc');

		this.initSubmit($withdrawBtc);
	}

	initSubmit ($form)
	{
		const $message = $('.js_withdraw_message');

		$form.on('submit', event => {

			event.preventDefault();

			const $alert = $message.closest('.alert');

			$alert
				.addClass('hidden')
				.removeClass('alert-danger alert-success');

			Util.ajax({
				url: this.url('/withdraw/request'),
				data: $form.serialize()
			}, response => {

				$message.html(response.message);

				if (response.result === 'success') {
					$alert.addClass('alert-success');

					setTimeout(() => {
						Util.reload();
					}, 3000);

				} else {
					$alert.addClass('alert-danger');
				}

				$message.closest('.alert').removeClass('hidden');
			});
		});
	}
}