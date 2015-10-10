## wadofgum-events [![Build Status](https://travis-ci.org/nlf/wadofgum-events.svg)](https://travis-ci.org/nlf/wadofgum-events)

An eventing mixin for [wadofgum](https://github.com/nlf/wadofgum) based on [spit](https://github.com/nlf/spit).

### Usage

This module adds `emit` and `on` methods to your model class which can be used just as you would use the spit module by itself. To load it, apply it as a mixin to the base *wadofgum* module.

The only event emitted by default is the `create` event, which will be triggered every time an instance of your class is created passing the instance as the parameter.

```js
const Wadofgum = require('wadofgum');
const Events = require('wadofgum-events');

class Model extends Wadofgum.mixin(Events) {};
Model.on('test', function () {
});

Model.emit('test');
```
