import {Controller} from "../../core/Controller";
import {Util} from "../../lib/Util";
import $ from "jquery";

export class Home extends Controller {
	init ()
	{
		super.init();

		this.initSignup();
		this.initRecoveryPassword();
		this.initForgotPassword();
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

	initForgotPassword()
	{
		console.log("forgot");
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


	initRecoveryPassword()
	{
		console.log("rec");
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