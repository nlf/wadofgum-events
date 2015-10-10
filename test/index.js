'use strict';

const Events = require('..');
const Wadofgum = require('wadofgum');

let lab = exports.lab = require('lab').script();
let expect = require('code').expect;
let it = lab.test;

it('can extend the base model', function (done) {

    class User extends Wadofgum.mixin(Events) {};
    expect(User.on).to.be.a.function();
    expect(User.emit).to.be.a.function();
    done();
});

it('fires the create event when instantiating a model', function (done) {

    class User extends Wadofgum.mixin(Events) {};
    User.on('create', function (model) {

        expect(model.name).to.equal('test');
        expect(model.age).to.equal(20);
        done();
    });

    let user = new User({ name: 'test', age: 20 });
    expect(user).to.contain('name', 'age');
});

it('can create an emitter when emitting', function (done) {

    class User extends Wadofgum.mixin(Events) {};
    expect(User.meta.has('emitter')).to.equal(false);
    User.emit('test', 'data').then(function () {

        expect(User.meta.has('emitter')).to.equal(true);
        done();
    });
});

it('can create an emitter when adding a listener', function (done) {

    class User extends Wadofgum.mixin(Events) {};
    expect(User.meta.has('emitter')).to.equal(false);
    User.on('test', function () { });
    expect(User.meta.has('emitter')).to.equal(true);
    done();
});

it('can emit an event', function (done) {

    class User extends Wadofgum.mixin(Events) {};
    User.on('test', function (data) {

        expect(data).to.equal('data');
    });

    User.on('test2', function (data) {

        done();
    });

    User.emit('test', 'data').then(function () {

        User.emit('test2', 'data');
    });
});
