import {Controller} from "../../core/Controller";
import 'jquery.scrollto';
import { Util } from "../../lib/Util";
import $ from "jquery";

export class Affiliatewithdraw extends Controller {
	init ()
	{
		super.init();

		this.initCloseRequest();
	}

	initCloseRequest()
	{
		const $button = $('.js_close_request');

		$button.on('click', (event) => {
			event.preventDefault();

			const $element = $(event.currentTarget);
			const id = $element.data('id');

			if ($element.is(':disabled')) {
				return;
			}

			$element.attr('disabled', true);

			Util.ajax({
				url: this.url('/affiliatewithdraw/closerequest'),
				data: 'id=' + id
			}, response => {
				if (response.result === 'success') {
					$element.parent().html(response.data.status);
				} else {
					$element.attr('disabled', false);
				}
			});
		});
	}
}