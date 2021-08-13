import { Util } from '../lib/Util';

export class Environment {
    constructor (mediator, options = {}) {
        this.instance = Util.generateString(5);
        this.mediator = mediator;
        this.debug    = !!options.debug;
        this.lang = options.lang;
        this.base_path = options.base_path;
        this.currency = options.currency;

		if (options.factory) {
			this.factory = options.factory;
		}
    }

    on (name, handler) {
        this.mediator.on(name, handler, false, this.instance);
    }

    once (name, handler) {
        this.mediator.on(name, handler, true, this.instance);
    }

    off (name) {
        this.mediator.off(name, this.instance);
    }

    trigger (name, data = {}) {
        this.mediator.trigger(name, data, this.instance);
    }

	url(path)
	{
		let url = '';

		if (this.base_path) {
			url += this.base_path;
		}

		if (this.lang) {
			url += '/' + this.lang;
		}

		url += path;

		return url;
	}
}