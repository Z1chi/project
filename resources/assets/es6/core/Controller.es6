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

    init() {

    }
}