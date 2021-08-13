import { Environment } from './Environment';

export class Controller {
    constructor (factory, config) {
        this.factory = factory;

		this.componentDefaults = {
			debug:   config.debug,
			lang:    config.lang,
			factory: this.factory,
			frozen:  false,
			base_path: config.base_path,
			currency: config.currency
		};

        this.env = new Environment(this.factory.mediator, this.componentDefaults);
    }

	url(path)
	{
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

	init () {}
}