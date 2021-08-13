import { $ } from './vendor';
import CONST from "./const";

export class BootstrapUtil {

	static handleErrors ($form, response)
	{
		$form.find('input, select').on('focus', (event) => {

			const $element = $(event.currentTarget);
			$element.closest('.form-group').removeClass('has-error')

		});

		Object.keys(response.data).forEach(name => {
			const $msg = $(`<span class="help-block">${response.data[name]}</span>`);

			$form.find(`[name="${name}"]`).parent().find('.help-block').remove();

			$form
				.find(`[name="${name}"]`)
				.one('focus click change', () => {
					$msg.closest('.form-group').removeClass('has-error');
					$msg.remove();
				})
				.closest('.form-group')
				.addClass('has-error')
				.append($msg);
		});
	}
	
	static addPreloaderTo ($element) {
		$element
			.closest('.form-group')
			.find('label')
			.append('<i class="fa fa-spin fa-refresh text-blue" style="margin-left: 0.5rem"></i>');
	}

	static removePreloaderFrom ($element) {

		const $preloader = $element
			.closest('.form-group')
			.find('label')
			.find('.fa-refresh');

		$preloader.removeClass('fa-spin fa-refresh text-blue');
		$preloader.addClass('fa-check text-green');

		setTimeout(() => {
			$preloader.remove();
		}, 1000);
	}
}