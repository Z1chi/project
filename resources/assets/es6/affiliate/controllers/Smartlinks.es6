import {Controller} from "../../core/Controller";
import { Util } from "../../lib/Util";
import $ from "jquery";

export class Smartlinks extends Controller {
	init ()
	{
		super.init();

		this.initCreate();
		this.initDelete();
	}

	initCreate ()
	{
		const $createForm = $('.js_smartlink_create_form');

		$createForm.on('submit', (event) => {
			event.preventDefault();

			Util.ajax({url: this.url('/smartlinks/create'), data: $createForm.serialize() }, response =>
			{
				if (response.result === 'error') {

					Util.handleBootstrapErrors($createForm, response);

				} else {
					Util.reload();
				}
			});
		});
	}

	initDelete ()
	{
		this.smartlinkDeleteId = false;

		$('.js_smartlink_delete').on('click', (event) => {
			this.smartlinkDeleteId = $(event.currentTarget).data('id');
		});

		$('#modal-delete button#modal-confirm').on('click', event =>
		{
			Util.ajax({url: this.url('/smartlinks/delete'), data: 'id=' + this.smartlinkDeleteId }, response =>
			{
				Util.reload();
			});
		});
	}

	// initSave ()
	// {
	// 	const $keyInputs = $('.js_smartlink');
	// 	const $saveButtons = $('.js_smartlink_save');
	//
	// 	$keyInputs.on('keyup change paste', (event) => {
	// 		const $element = $(event.currentTarget);
	// 		const $button = $element.parent().find('.js_smartlink_save');
	//
	// 		$button.prop('disabled', false);
	//
	// 		if (event.which === 13) {
	// 			$button.click();
	// 		}
	// 	});
	//
	// 	$saveButtons.on('click', (event) => {
	// 		const $element = $(event.currentTarget);
	//
	// 		const id = $element.data('id');
	// 		const title = $element.closest('.input-group').find('.js_smartlink').val();
	//
	// 		const data = {
	// 			id: id,
	// 			title: title
	// 		};
	//
	// 		Pace.restart();
	//
	// 		Util.ajax({url: this.url('/smartlinks/save'), data: data }, response =>
	// 		{
	// 			if (response.result !== 'success') {
	// 				Util.reload();
	// 			}
	//
	// 			Pace.stop();
	// 			$element.attr('disabled', true);
	// 		});
	// 	});
	// }
}