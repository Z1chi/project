import { Controller } from '../../core/Controller';
import {Util} from "../../lib/Util";

export class MainController extends Controller {

    init () {
    	super.init();

        // const componentList = [
			// ''
        // ];
		//
        // this.factory.createComponents(componentList, this.componentDefaults);

		this.initEvents();

		this.initAuth();
		this.initLogout();
		this.initHeartbeat();
		this.initSideMenu();
    }

    afterAction () {

    }

	initEvents() {
		let resizeTimer;

		$(window).on('resize', () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				this.env.trigger('windowResizeEnd', { width: $(window).outerWidth(), height: $(window).outerHeight() });
			}, 250);
		});
	}

	initAuth() {

		const $authForm = $('.js_auth_form');

		if ($authForm.length > 0) {

			$authForm.find('input[name=username]').focus();

			const $authMessage = $('.js_auth_message', $authForm);
			const $buttonSubmit = $authForm.find('button[type=submit]');

			const $inputUsername = $authForm.find('input[name=username]');
			const $inputPassword = $authForm.find('input[name=password]');
			const $inputToken = $authForm.find('input[name=token]');

			$authForm.on('submit', (event) => {

				event.preventDefault();

				if ($inputUsername.val().length < 1 || $inputPassword.val().length < 1) {
					return;
				}

				const data = {
					login: $inputUsername.val(),
					password: $inputPassword.val(),
					token: $inputToken.val()
				};

				$buttonSubmit.prop('disabled', true);

				Util.ajax({url: this.url('/home/auth'), data: data}, response => {
					if (response.result === 'success') {
						Util.reload();
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

	initLogout()
	{
		const $logoutButton = $('.js_logout');

		$logoutButton.on('click', (event) => {
			event.preventDefault();
			Util.ajax({url: this.url('/home/logout')}, response => {
				Util.reload();
			});
		});
	}

	initHeartbeat ()
	{
		setInterval(() => { Util.ajax({url: this.url('/home/heartbeat')}); }, 60000);
	}

	initSideMenu() {
		const $sideMenu = $('.js_side_menu');

		const currentController = $('body').data('controller');

		$("[data-controller='"+ currentController + "']", $sideMenu).addClass('active');
	}
}