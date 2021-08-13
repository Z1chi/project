import {Controller} from "../../core/Controller";
import { Util } from "../../lib/Util";
import $ from "jquery";

export class Actionlog extends Controller {
	init ()
	{
		super.init();

		this.initFilters();
	}

	initFilters() {
		const $filterSelects = $('.js_filter, .js_order');

		$filterSelects.on('change', (event) => {

			const $element = $(event.currentTarget);
			const param = $element.data('param');
			const value = $element.val();

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