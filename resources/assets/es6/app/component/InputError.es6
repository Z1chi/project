import { Component } from '../../core/Component';
import $ from 'jquery';

export class InputError extends Component {
	init($form, noscroll=false) {
		super.init();
		this.$form = $form;
		this.noscroll = noscroll;
	}

	show(data) {

		this.$form.find('input, select').on('focus', (event) => {

			const $element = $(event.currentTarget);
			$element.parent().removeClass('input_error')

		});

		let scrollToStart = false;

		Object.keys(data).forEach(name => {
			const $msg = $(`<span class="input_error_msg">${data[name]}</span>`);

			if (name == 'form') {
				scrollToStart = true;

				this.scrollTo(this.$form)

				return this.$form.one('input', () => $msg.remove()).prepend( $msg );
			}

			this.$form
				.find(`[name="${name}"], div[data-name="${name}"], select[data-name="${name}"]`)
				.one('focus click change', () => {
					$msg.closest('.form_field').removeClass('input_error');
					$msg.remove();
				})
				.closest('.form_field')
				.addClass('input_error')
				.find('.default_label')
				.append($msg);
		});

		if (!scrollToStart) {

			let $firstError = $('.input_error:first');

			// scroll to first error
			if ($firstError.length) {
				this.scrollTo($firstError);
			}
		}
	}

	scrollTo ($block) {
		if (!this.noscroll) {
			$('html, body').animate({
				scrollTop: $block.offset().top - 20
			}, 500);
		}
	}

	remove() {
		this.$form.find('.input_error_msg').remove();
	}
}

