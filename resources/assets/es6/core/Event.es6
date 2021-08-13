export class Event {
    constructor (type, target, data) {
        this.type    = type;
        this.target  = target;
        this.data    = data;
        this.stopped = false;
    }

    stop () {
        this.stopped = true;
    }
}