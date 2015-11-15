'use strict';

const Events = require('..');
const Wadofgum = require('wadofgum');

const lab = exports.lab = require('lab').script();
const expect = require('code').expect;
const it = lab.test;

it('can extend the base model', (done) => {

    class User extends Wadofgum.mixin(Events) {};
    expect(User.on).to.be.a.function();
    expect(User.emit).to.be.a.function();
    done();
});

it('fires the create event when instantiating a model', (done) => {

    class User extends Wadofgum.mixin(Events) {};
    User.on('create', (model) => {

        expect(model.name).to.equal('test');
        expect(model.age).to.equal(20);
        done();
    });

    const user = new User({ name: 'test', age: 20 });
    expect(user).to.contain('name', 'age');
});

it('can create an emitter when emitting', (done) => {

    class User extends Wadofgum.mixin(Events) {};
    expect(User.meta.has('emitter')).to.equal(false);
    User.emit('test', 'data').then(() => {

        expect(User.meta.has('emitter')).to.equal(true);
        done();
    });
});

it('can create an emitter when adding a listener', (done) => {

    class User extends Wadofgum.mixin(Events) {};
    expect(User.meta.has('emitter')).to.equal(false);
    User.on('test', () => {});
    expect(User.meta.has('emitter')).to.equal(true);
    done();
});

it('can emit an event', (done) => {

    class User extends Wadofgum.mixin(Events) {};
    User.on('test', (data) => {

        expect(data).to.equal('data');
    });

    User.on('test2', (data) => {

        done();
    });

    User.emit('test', 'data').then(() => {

        User.emit('test2', 'data');
    });
});
