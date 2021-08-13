import { Controller } from '../../core/Controller';
import { $ } from '../../lib/vendor';
import {Util} from "../../lib/Util";
import Cookies from "js-cookie";
import CONST from "../../lib/const";

export class MainController extends Controller {

    init () {
    	super.init();

        const componentList = [
			// 'Hamburger',
        ];

        this.factory.createComponents(componentList, this.componentDefaults);

		this.initEvents();
    }

    afterAction () {

    }

	initEvents() {
		let resizeTimer;

		$(window).on('resize', () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				this.env.trigger('windowResizeEnd', { width: $(window).outerWidth(), height: $(window).outerHeight() });
			}, 250);
		});
	}
}

MainController.fastInterval = 500;
MainController.slowInterval = 700;
MainController.verySlowInterval = 1200;