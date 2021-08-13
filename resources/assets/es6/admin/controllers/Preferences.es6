import {Controller} from "../../core/Controller";
import { Util } from "../../lib/Util";

export class Preferences extends Controller {
	init ()
	{
		super.init();

		const $keyInputs = $('.js_variables_key');
		const $saveButtons = $('.js_variables_save');

		$keyInputs.on('keyup change paste', (event) => {
			const $element = $(event.currentTarget);
			const $button = $element.parent().find('.js_variables_save');

			$button.prop('disabled', false);

			if (event.which === 13) {
				$button.click();
			}
		});

		$saveButtons.on('click', (event) => {
			const $element = $(event.currentTarget);

			const key = $element.data('key');
			const value = $element.closest('.input-group').find('.js_variables_key').val();

			const data = {
				key: key,
				value: value
			};

			Pace.restart();

			Util.ajax({url: this.url('/preferences/save'), data: data }, response =>
			{
				if (response.result !== 'success') {
					// error modal
				}

				Pace.stop();
				$element.attr('disabled', true);
			});
		});
	}
}