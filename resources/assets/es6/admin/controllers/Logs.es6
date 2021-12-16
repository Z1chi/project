import {Controller} from "../../core/Controller";
import 'jquery.scrollto';
import { Util } from "../../lib/Util";
import $ from "jquery";
import 'bootstrap-daterangepicker';
import {BootstrapUtil} from "../../lib/BootstrapUtil";

export class Logs extends Controller {
	init ()
	{
		super.init();

		$('.js_date_range').daterangepicker({
			opens: 'right',
			locale: {
				format: 'DD.MM.YYYY',
				firstDay: 1
			}
		}, function(start, end, label)
		{
			Util.insertParam('date', '["' + start.format('DD.MM.YYYY') + '", "' + end.format('DD.MM.YYYY') + '"]');
		});

		try {
			const date_str = decodeURIComponent(Util.getUrlParam('date'));
			const date_array = JSON.parse(date_str);

			$('.js_date_range').data('daterangepicker').setStartDate(date_array[0]);
			$('.js_date_range').data('daterangepicker').setEndDate(date_array[1]);
		} catch (e) {}

		this.initFilters();
	}

	// todo code duplication
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
}