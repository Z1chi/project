import { Event } from './Event';

export class Mediator {
    constructor () {
        this.events = {};
    }

    on (name, handler, once = false, instance) {
        if (!this.events[name]) {
            this.events[name] = {};
        }

        this.events[name][instance] = {
            handler:   handler,
            reactOnce: once
        };
    }

    off (name, instance) {
        if (instance && name && this.events[name] && this.events[name][instance]) {
            delete this.events[name][instance];
        } else if (instance && (!name || name === '*')) {
            Object.keys(this.events).forEach(eventName => {
                if (this.events[eventName][instance]) {
                    delete this.events[eventName][instance];
                }
            });
        }
    }

    trigger (list, data = {}, instance) {
        list = Array.isArray(list) ? list : [list];

        list.forEach(name => {
            if (!this.events[name]) {
                return;
            }

            const event = new Event(name, instance, data);

            for (let listener in this.events[name]) {
                if (this.events[name].hasOwnProperty(listener)) {
                    this.events[name][listener].handler(event);

                    if (this.events[name][listener].reactOnce) {
                        this.off(listener, name);
                    }

                    if (event.stopped) {
                        break;
                    }
                }
            }
        });
    }
}