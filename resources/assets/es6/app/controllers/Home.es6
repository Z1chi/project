import {Controller} from "../../core/Controller";
import {Util} from "../../lib/Util";
import $ from "jquery";

export class Home extends Controller {
	init ()
	{
		super.init();

		this.initAuth();
		this.initSignup();
	}

	initAuth() {

		const $authForm = $('.js_auth_form');

		if ($authForm.length > 0) {

			$authForm.find('input[name=username]').focus();

			const $authMessage = $('.error-label', $authForm);
			const $buttonSubmit = $authForm.find('.js_auth_form_submit');

			const $inputUsername = $authForm.find('input[name=username]');
			const $inputPassword = $authForm.find('input[name=password]');

			$buttonSubmit.on('click', (event) => {
				event.preventDefault();
				$authForm.submit();
			});

			$authForm.on('submit', (event) => {

				event.preventDefault();

				if ($inputUsername.val().length < 1 || $inputPassword.val().length < 1) {
					return;
				}

				const data = {
					login: $inputUsername.val(),
					password: $inputPassword.val()
				};

				$buttonSubmit.prop('disabled', true);

				Util.ajax({url: '/affiliate/home/auth', data: data}, response => {
					if (response.result === 'success') {
						Util.changeLocation('/affiliate');
					} else {
						$authMessage.html(response.message);

						$inputPassword.val('');
						$inputPassword.focus();
					}

					$buttonSubmit.prop('disabled', false);
				});
			});
		}
	}

	initSignup ()
	{
		const $form = $('.js_signup_form');
		const $buttonSubmit = $form.find('.js_signup_form_submit');

		$buttonSubmit.on('click', (event) => {
			event.preventDefault();
			$form.submit();
		});

		$form.on('submit', (event) => {
			event.preventDefault();

			Util.ajax({url: '/affiliate/home/signup', data: $form.serialize() }, response =>
			{
				if (response.result === 'error') {

					Util.handleFormErrors($form, response);

				} else {
					Util.changeLocation('/affiliate/home');
				}
			});
		});
	}

	setStorage (key, value) {
		if (typeof(Storage) !== "undefined") {
			localStorage.setItem(key, value);
		}
	}

	getStorage (key, defaultValue) {
		if (typeof(Storage) !== "undefined") {
			const value = localStorage.getItem(key);

			if (value === undefined || isNaN(value) || !value) {
				return defaultValue;
			}

			return value;
		}

		return defaultValue;
	}
}