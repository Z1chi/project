import { Mediator } from './Mediator';
import { Environment } from './Environment';

export class Factory {
    constructor (list, mediator) {
        this.list     = list;
        this.mediator = mediator || new Mediator();
    }

    createComponent (name, options = {}) {
        if (!this.list[name]) {
            throw new Error(`Factory -> Attempt to create nonexistent component ${name}`);
        }

        const environment = new Environment(this.mediator, options);
        const component   = new this.list[name](environment);

        if (!options.frozen) {
            component.init();
        }

        return component;
    }

    createComponents (list, options = {}) {

        const components = [];

        list.forEach(name => {
            components.push( this.createComponent(name, options) );
        });

        return components;
    }
}