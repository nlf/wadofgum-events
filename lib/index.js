'use strict';

const Spit = require('spit');

module.exports = function (baseClass) {

    class Model extends baseClass {
        constructor(fields) {

            super(fields);
            this.constructor.emit('create', this);
        };

        static get emit() {

            this.meta.has('emitter') || this.meta.set('emitter', new Spit());
            const emitter = this.meta.get('emitter');
            return emitter.emit.bind(emitter);
        };

        static get on() {

            this.meta.has('emitter') || this.meta.set('emitter', new Spit());
            const emitter = this.meta.get('emitter');
            return emitter.on.bind(emitter);
        };
    };

    Model.capabilities.add('events');

    return Model;
};
