import {Controller} from "../../core/Controller";
import 'jquery.scrollto';
import { Util } from "../../lib/Util";
import $ from "jquery";
import {BootstrapUtil} from "../../lib/BootstrapUtil";
import 'bootstrap-timepicker';
import 'bootstrap-datepicker'

export class Users extends Controller {
	init ()
	{
		super.init();

		const $container = $('.js_user');
		this.user_id = $container.data('user-id');

		this.initAddComment();
		this.initUpdateProfile();
		this.initVerify();
		this.initStatuses();
		this.initFilters();
		this.initGetlead();
		this.initBonusCalculator();
		this.initBonusForm();
		this.initSearch();
		this.initManagerMenu();
		this.initAddTask();
		this.initDisable2fa();
		this.initGetLocalTime();
	}

	initVerify ()
	{
		const $verifyButton = $('.js_user_verify');

		$verifyButton
			.on('click', (event) => {
				event.preventDefault();

				Pace.restart();

				Util.ajax({url: this.url('/users/verify'), data: 'user_id=' + this.user_id }, response =>
				{
					Util.reload();

					Pace.stop();
				});

			});
	}

	initDisable2fa ()
	{
		const $verifyButton = $('.js_user_disable_2fa');

		$verifyButton
			.on('click', (event) => {
				event.preventDefault();

				Pace.restart();

				Util.ajax({url: this.url('/users/disabletwofactor'), data: 'user_id=' + this.user_id }, response =>
				{
					Util.reload();

					Pace.stop();
				});

			});
	}

	initUpdateProfile()
	{
		const $submitButton = $('.js_user_update');
		const $form = $('.js_user_form');
		const $result = $('.js_user_result');

		$submitButton
			.on('click', (event) => {
				event.preventDefault();
				$form.submit();
			});

		$form.on('submit', (event) =>
		{
			event.preventDefault();

			Pace.restart();

			Util.ajax({url: this.url('/users/update'), data: $form.serialize() }, response =>
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

	initAddComment()
	{
		const $form = $('.js_user_comment_form');
		const $submitButton = $form.find('input[type="submit"]');

		// todo refactor
		$form.append('<input type="hidden" name="user_id" value="'+ this.user_id +'">');

		$form.on('submit', (event) =>
		{
			event.preventDefault();

			$submitButton.attr('disabled', true);

			Pace.restart();

			Util.ajax({url: this.url('/users/addcomment'), data: $form.serialize() }, response =>
			{
				Util.reload();
			});
		});
	}

	initAddTask()
	{
		$('.js_task_time').timepicker({
			minuteStep: 1,
			template: 'modal',
			appendWidgetTo: 'body',
			showSeconds: false,
			showMeridian: false,
			defaultTime: false
		});

		$('.js_task_date').datepicker({
			format: 'dd.mm.yyyy',
		});

		const $form = $('.js_task_form');
		const $submitButton = $form.find('button[type="submit"]');
		const $result = $('.js_task_result');

		// todo refactor
		$form.append('<input type="hidden" name="user_id" value="'+ this.user_id +'">');

		$form.on('submit', (event) =>
		{
			event.preventDefault();

			$result.addClass('hidden');

			$submitButton.attr('disabled', true);

			Pace.restart();

			Util.ajax({url: this.url('/users/addtask'), data: $form.serialize() }, response =>
			{
				if (response.result === 'success') {
					Util.reload();
				} else {
					$result.html(response.message);
					$result.removeClass('hidden');
					$submitButton.attr('disabled', false);
				}
			});
		});
	}

	initBonusForm()
	{
		const $form = $('.js_user_bonus_form');
		const $submitButton = $form.find('input[type="submit"]');

		// todo refactor
		$form.append('<input type="hidden" name="user_id" value="'+ this.user_id +'">');

		$form.on('submit', (event) =>
		{
			event.preventDefault();

			$submitButton.attr('disabled', true);

			Pace.restart();

			Util.ajax({url: this.url('/users/addbonus'), data: $form.serialize() }, response =>
			{
				Util.reload();
			});
		});

		const $deleteBonusButtons = $('.js_delete_bonus');

		$deleteBonusButtons.on('click', (event) => {

			event.preventDefault();

			const $element = $(event.currentTarget);
			const miner_id = $element.data('id');

			if ($element.is(':disabled')) return;

			$element.attr('disabled', true);

			Util.ajax({url: this.url('/users/deletebonus'), data: 'miner_id=' + miner_id }, response =>
			{
				if (response.result !== 'success') {
					$element.attr('disabled', false);
				} else {
					Util.reload();
				}
			});
		});

		const $feeTypeSelect = $('.js_fee_type');

		$feeTypeSelect.on('change', (event) => {

			const $element = $(event.currentTarget);
			const miner_id = $element.data('id');
			const static_fee = $feeTypeSelect.val();

			$element.attr('disabled', true);

			Util.ajax({url: this.url('/users/changefeetype'), data: 'miner_id=' + miner_id + '&static_fee=' + static_fee }, response =>
			{
				if (response.result !== 'success') {
					Util.reload(); // todo just change value back
				}
			});
		});
	}

	initStatuses()
	{
		const $accountSelect = $('.js_account_status');
		const $docsSelect = $('.js_docs_status');
		const $docsCommentForm = $('.js_docs_comment');

		$accountSelect.on('change', (event) =>
		{
			const value = $accountSelect.val();

			BootstrapUtil.addPreloaderTo($accountSelect);
			$accountSelect.blur();

			Util.ajax({
				url: this.url('/users/accountstatus'),
				data: 'user_id=' + this.user_id + '&status=' + value
			}, response => {
				if (response.result !== 'success') {
					Util.reload();
				}

				BootstrapUtil.removePreloaderFrom($accountSelect);
			});
		});

		$docsSelect.on('change', (event) =>
		{
			const value = $docsSelect.val();

			BootstrapUtil.addPreloaderTo($docsSelect);
			$docsSelect.blur();

			Util.ajax({
				url: this.url('/users/docsstatus'),
				data: 'user_id=' + this.user_id + '&status=' + value
			}, response => {
				if (response.result !== 'success') {
					Util.reload();
				}

				BootstrapUtil.removePreloaderFrom($docsSelect);
			});
		});

		$docsCommentForm.on('submit', (event) => {
			event.preventDefault();

			const $input = $docsCommentForm.find('input[type="text"]');
			const value = encodeURIComponent($input.val());

			$input.blur();

			BootstrapUtil.addPreloaderTo($docsCommentForm);

			Util.ajax({
				url: this.url('/users/docsmessage'),
				data: 'user_id=' + this.user_id + '&message=' + value
			}, response => {
				if (response.result !== 'success') {
					Util.reload();
				}

				BootstrapUtil.removePreloaderFrom($docsCommentForm);
			});
		});
	}

	initFilters() {
		const $filterSelects = $('.js_filter, .js_order');

		$filterSelects.on('change', (event) => {

			const $element = $(event.currentTarget);

			let param, value;

			param = $element.data('param');

			if ($element.attr('type') === 'checkbox') {
				if ($element.is(':checked')) {
					value = true;
				} else {
					value = '';
				}
			} else {
				value = $element.val();
			}

			if (value === '')
			{
				var originalURL = document.location.href;
				var alteredURL = Util.removeParam(param, originalURL);

				document.location.href = alteredURL;

			} else {
				Util.insertParam(param, value);
			}
		});
	}

	initGetlead() {
		const $button = $('.js_getlead');

		$button.on('click', (event) => {
			event.preventDefault();

			if ($button.is(':disabled')) {
				return;
			}

			$button.attr('disabled', true);

			Util.ajax({
				url: this.url('/users/getlead'),
			}, response => {
				if (response.result === 'success') {
					Util.changeLocation(this.env.url('/users/?id=' + response.data.id));
				} else {

					if (response.message) {
						$button.parent().find('span').html(response.message);
					}

					$button.attr('disabled', false);
				}
			});
		});
	}

	initBonusCalculator()
	{
		this.$bonusSource = $('.js_bonus_source');
		this.$bonusSelect = $('.js_bonus_percent');

		const $minersGhs = $('.js_click_for_bonus');

		this.$bonusSelect.on('change', (event) => {
			this.bonusUpdate();
		});

		$minersGhs.on('click', (event) =>
		{
			event.preventDefault();

			const $element = $(event.currentTarget);

			this.$bonusSource.val($element.html());
			this.bonusUpdate();
		});

		this.$bonusSource.on('keyup', (event) =>
		{
			event.preventDefault();
			this.bonusUpdate();
		});
	}

	bonusUpdate ()
	{

		const $bonusInput = $('.js_user_bonus_input');

		const percent = this.$bonusSelect.val();
		const sourceVal = parseInt(this.$bonusSource.val());

		const bonus = parseInt(sourceVal / 100 * percent);

		$bonusInput.val(bonus);
	}

	initSearch() {
		const $searchForm = $('.js_search_form');

		$searchForm.on('submit', (event) => {
			event.preventDefault();

			const query = $searchForm.find('input[type="text"]').val();

			Util.insertParam('query', query);
		});
	}

	initManagerMenu() {
		const $buttonAssignToMe = $('.js_assign_to_me');
		const $buttonAssignTo = $('.js_assign_to');
		const $selectAssignAdmin = $('.js_assign_admin');

		$buttonAssignToMe.on('click', (event) => {

			event.preventDefault();

			if ($buttonAssignToMe.is(':disabled')) {
				return;
			}

			$buttonAssignToMe.attr('disabled', true);

			Util.ajax({
				url: this.url('/users/assigntome'),
				data: 'user_id=' + this.user_id
			}, response => {
				if (response.result === 'success') {
					Util.reload();
				} else {
					$buttonAssignToMe.attr('disabled', false);
				}
			});
		});

		$buttonAssignTo.on('click', (event) => {

			event.preventDefault();

			if ($buttonAssignTo.is(':disabled')) {
				return;
			}

			$buttonAssignTo.attr('disabled', true);

			Util.ajax({
				url: this.url('/users/assignto'),
				data: 'user_id=' + this.user_id + '&new_admin_id=' + $selectAssignAdmin.val()
			}, response => {
				if (response.result === 'success') {
					Util.reload();
				} else {
					$buttonAssignTo.attr('disabled', false);
				}
			});
		});
	}

	initGetLocalTime()
	{
		const $block = $('.js_local_time');
		const ip = $block.data('ip');

		Util.ajax({
			url: this.url('/users/gettime'),
			data: 'ip=' + ip,
		}, response => {
			if (response.result === 'success') {
				if (response.data.time) {
					$block.html(response.data.time);
				}
			}
		});
	}
}