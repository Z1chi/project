import {Controller} from "../../core/Controller";
import {Header} from "./Header";
import {Util} from "../../lib/Util";
import $ from "jquery";
import Swiper from 'swiper';
import {WOW} from "wowjs";

export class Home extends Controller {

	init ()
	{
		super.init();
		new WOW({live: false}).init();

		this.initAuth();
		this.initSignup();
		this.homeSwiper();
		this.homeMain();
		this.homeModal();
		Header.hamburger();
		Header.changeLanguage();
	}


	initAuth() {
		const $authForm = $('.js_auth_form');

		if ($authForm.length > 0) {

			$authForm.find('input[name=username]').focus();

			const $authMessage = $('.error-label', $authForm);
			const $buttonSubmit = $authForm.find('.js_auth_form_submit');

			const $inputUsername = $authForm.find('input[name=username]');
			const $inputPassword = $authForm.find('input[name=password]');

			$buttonSubmit.on('click', (event) => {
				event.preventDefault();
				$authForm.submit();
			});

			$authForm.on('submit', (event) => {

				event.preventDefault();
				if ($inputUsername.val().length < 1 || $inputPassword.val().length < 1) {
					return;
				}

				const data = {
					login: $inputUsername.val(),
					password: $inputPassword.val()
				};

				$buttonSubmit.prop('disabled', true);
				Util.ajax({url: '/affiliate/home/auth', data: data}, response => {
					if (response.result === 'success') {
						Util.changeLocation('/affiliate');
					} else {

						$authMessage.html(response.message);

						$inputPassword.val('');
						$inputPassword.focus();
					}

					$buttonSubmit.prop('disabled', false);
				});
			});
		}
	}

	initSignup () {
		const $form = $('.js_signup_form');
		const $buttonSubmit = $form.find('.js_signup_form_submit');

		$buttonSubmit.on('click', (event) => {
			event.preventDefault();
			$form.submit();
		});

		$form.on('submit', (event) => {
			event.preventDefault();

			Util.ajax({url: '/affiliate/home/signup', data: $form.serialize() }, response =>
			{
				if (response.result === 'error') {

					Util.handleFormErrors($form, response);

				} else {
					Util.changeLocation('/affiliate/home');
				}
			});
		});
	}

	setStorage (key, value) {
		if (typeof(Storage) !== "undefined") {
			localStorage.setItem(key, value);
		}
	}

	getStorage (key, defaultValue) {
		if (typeof(Storage) !== "undefined") {
			const value = localStorage.getItem(key);

			if (value === undefined || isNaN(value) || !value) {
				return defaultValue;
			}

			return value;
		}

		return defaultValue;
	}


	homeSwiper() {
		let offersSwiper = new Swiper(".js_offers_swiper", {
			slidesPerView: 1.5,
			spaceBetween: 100,
			allowTouchMove: true,
			loop: true,
			loopedSlides: 50,
			breakpoints: {
				760: {
					slidesPerView: 1.2,
					spaceBetween: 20
				},
				1210: {
					slidesPerView: 1.2,
					spaceBetween: 15
				}
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		});

		let reviewsSwiper = new Swiper(".js_reviews_swiper", {
			slidesPerView: 2.7,
			spaceBetween: 40,
			allowTouchMove: true,
			loop: true,
			loopedSlides: 50,
			breakpoints: {
				760: {
					slidesPerView: 1.2,
					spaceBetween: 20
				},
				1210: {
					slidesPerView: 1.5,
					spaceBetween: 15
				}
			},
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: true,
			},
			navigation: {
				nextEl: '.swiper-button-next-review',
				prevEl: '.swiper-button-prev-review'
			}
		});

	}

	homeMain () {

		$('.js_show_more').on('click', function() {
			$('.aff1liate-line.hidden').toggleClass('not-active');
			if($('.aff1liate-line').css('width') == '100%'){
				$('.aff1liate-line').slideToggle(500);
			}
			$('.aff1liate-line').toggleClass('d-m-flex');
			$('.hidden-aff1liate').slideToggle(500);
			$('.js_show_more img').toggleClass('rotate');
		});

		$('.js_hover').hover(
			function() {
				$('.opacity-layer').fadeIn( 400 );
			}, function() {
				$('.opacity-layer').fadeOut( 400 );
			}
		);


	}

	homeModal () {

		$('.js_close_modal').on('click', function(e) {
			e.preventDefault();
			$('.modal').fadeOut( 400 );
		});

		$('.js_login_modal').on('click', function(e) {
			e.preventDefault();
			$('.login-modal').fadeIn( 400 );
		});

		$('.js_sign_modal').on('click', function(e) {
			e.preventDefault();
			$('.sign-modal').fadeIn( 400 );
		});

		$(document).mouseup(function(e) {
			let container = $('.modal-content');

			if (!container.is(e.target) && container.has(e.target).length === 0) {
				$('.modal').fadeOut( 400 );
			}
		});

		$('.js_view_pass').each(function () {
			let eye = $(this);
			eye.on('click', function() {
				eye.siblings("input").each(function () {
					if($(this).attr('type') === 'password'){
						$(this).attr('type', 'text');
						eye.attr('src', '/assets/svg/eye-open-view.svg')
					} else {
						$(this).attr('type', 'password');
						eye.attr('src', '/assets/svg/eye-view.svg')
					}
				});
			});
		});
	}

}