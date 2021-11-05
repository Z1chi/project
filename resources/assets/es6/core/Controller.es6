import {Environment} from './Environment';
import $ from "jquery";
import {Util} from "../lib/Util";
import {WOW} from "wowjs";


export class Controller {
    constructor(factory, config) {
        this.factory = factory;

        this.componentDefaults = {
            debug: config.debug,
            lang: config.lang,
            factory: this.factory,
            frozen: false,
            base_path: config.base_path,
            currency: config.currency
        };

        this.env = new Environment(this.factory.mediator, this.componentDefaults);


    }

    url(path) {
        let url = '';

        if (this.componentDefaults.base_path) {
            url += this.componentDefaults.base_path;
        }

        if (this.componentDefaults.lang) {
            url += '/' + this.componentDefaults.lang;
        }

        url += path;

        return url;
    }

    initFilters() {
        const $filterSelects = $('.js_filter, .js_order');

        $filterSelects.on('change', (event) => {

            const $element = $(event.currentTarget);
            const param = $element.data('param');
            const value = $element.val();

            if (value === '') {
                var originalURL = document.location.href;
                var alteredURL = Util.removeParam(param, originalURL);

                document.location.href = alteredURL;

            } else {
                Util.insertParam(param, value);
            }
        });
    }

    headerModal() {

        $('.js_close_modal').on('click', function (e) {
            e.preventDefault();
            $('.modal').fadeOut(400);
        });

        $('.js_login_modal').on('click', function (e) {
            e.preventDefault();
            $('.login-modal').fadeIn(400);
        });

        $('.js_sign_modal').on('click', function (e) {
            e.preventDefault();
            $('.sign-modal').fadeIn(400);
        });

        $(document).mouseup(function (e) {
            let container = $('.modal-content');

            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $('.modal').fadeOut(400);
            }
        });

        $('.js_view_pass').each(function () {
            let eye = $(this);
            eye.on('click', function () {
                eye.siblings("input").each(function () {
                    if ($(this).attr('type') === 'password') {
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


    init() {

    }
}