import {Controller} from "../../core/Controller";
import 'jquery.scrollto';
import { Util } from "../../lib/Util";
import $ from "jquery";

export class Affiliates extends Controller {
	init ()
	{
		super.init();

		this.initSelects();
	}

	initSelects()
	{
		const $activeSelect = $('.js_active_select');

		$activeSelect.on('change', (event) =>
		{
			const $element = $(event.currentTarget);

			const value = $element.val();
			const affiliate_id = $element.data('affiliate-id');

			Pace.restart();

			Util.ajax({
				url: this.url('/affiliates/activate'),
				data: 'affiliate_id=' + affiliate_id + '&active=' + value
			}, response => {
				Util.reload();
			});
		});
	}
}