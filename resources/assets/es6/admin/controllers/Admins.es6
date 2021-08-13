import {Controller} from "../../core/Controller";
import 'jquery.scrollto';
import { Util } from "../../lib/Util";
import $ from "jquery";

export class Admins extends Controller {
	init ()
	{
		super.init();

		const $container = $('.js_admin');
		this.admin_id = $container.data('admin-id');

		$('.js_time').timepicker({
			minuteStep: 10,
			template: 'modal',
			appendWidgetTo: 'body',
			showSeconds: false,
			showMeridian: false,
			defaultTime: false
		});

		$('.js_date').datepicker({
			format: 'dd.mm.yyyy',
		});;

		this.initSelects();
		this.initUpdateProfile();
		this.initResetPassword();
		this.initAddAdmin();
		this.initAddShift();
		this.initRemoveShift();
	}

	initSelects()
	{
		const $activeSelect = $('.js_active_select');

		$activeSelect.on('change', (event) =>
		{
			const $element = $(event.currentTarget);

			const value = $element.val();
			const affiliate_id = $element.data('admin-id');

			Pace.restart();

			Util.ajax({
				url: this.url('/admins/activate'),
				data: 'admin_id=' + affiliate_id + '&active=' + value
			}, response => {
				Util.reload();
			});
		});
	}

	initUpdateProfile()
	{
		const $submitButton = $('.js_admin_update');
		const $form = $('.js_admin_form');
		const $result = $('.js_admin_result');

		$submitButton
			.on('click', (event) => {
				event.preventDefault();
				$form.submit();
			});

		$form.on('submit', (event) =>
		{
			event.preventDefault();

			Pace.restart();

			Util.ajax({url: this.url('/admins/update'), data: $form.serialize() }, response =>
			{
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

	initResetPassword()
	{
		const $submitButton = $('.js_admin_reset_password');
		const $result = $('.js_admin_new_password');

		$submitButton
			.on('click', (event) => {
				event.preventDefault();

				Pace.restart();

				Util.ajax({url: this.url('/admins/resetpassword'), data: 'admin_id=' + this.admin_id }, response =>
				{
					if (response.result === 'success') {
						$result.removeClass('hidden');
						$result.find('p').html(response.data.password);
					} else {
						Util.reload();
					}

					Pace.stop();
				});
			});
	}

	initAddAdmin()
	{
		const $submitButton = $('.js_admin_add_button');
		const $form = $('.js_admin_add_form');
		const $result = $('.js_admin_add_result');

		$submitButton
			.on('click', (event) => {
				event.preventDefault();
				$form.submit();
			});

		$form.on('submit', (event) =>
		{
			event.preventDefault();

			Pace.restart();

			Util.ajax({url: this.url('/admins/addadmin'), data: $form.serialize() }, response =>
			{
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

	initAddShift()
	{
		const $submitButton = $('.js_shift_add_button');
		const $form = $('.js_shift_add_form');
		const $result = $('.js_shift_add_result');

		$submitButton
			.on('click', (event) => {
				event.preventDefault();
				$form.submit();
			});

		$form.on('submit', (event) =>
		{
			event.preventDefault();

			Pace.restart();

			Util.ajax({url: this.url('/admins/addshift'), data: $form.serialize() }, response =>
			{
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

	initRemoveShift()
	{
		const $removeButton = $('.js_shift_remove_button');

		$removeButton.on('click', (event) => {
			event.preventDefault();
			let btn = $(event.currentTarget);
			if (confirm('Удалить смену?')) {
				Pace.restart();

				Util.ajax({url: this.url('/admins/removeshift'), data: 'shift_id=' + btn.attr('data-id') }, response =>
				{
					if (response.result !== 'success') {
						alert(response.message);
					} else {
						$('#shift_' + btn.attr('data-id')).fadeOut(function(){
							$(this).remove();
						});
					}

					Pace.stop();
				});
			}
		});
	}
}