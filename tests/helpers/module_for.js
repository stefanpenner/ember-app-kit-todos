var __testing_context__;

export function moduleFor(fullName, description, callbacks, delegate) {
  var container = isolatedContainer([fullName]);
  callbacks = callbacks || { };

  callbacks.subject = callbacks.subject || function(factory, options) {
    return factory.create(options);
  };

  callbacks.setup    = callbacks.setup    || function() { };
  callbacks.teardown = callbacks.teardown || function() { };

  function factory() {
    return container.lookupFactory(fullName);
  }

  function subject(options) {
    return callbacks.subject(factory(), options);
  }

  __testing_context__ = {
    container: container,
    subject: subject,
    factory: factory,
    __setup_properties__: callbacks
  };


  if (delegate) {
    delegate(factory(), container, __testing_context__);
  }

  var _callbacks = {
    setup: function(){
      callbacks.setup(container);
    },
    teardown: function(){
      Ember.run(container, 'destroy');
      Ember.$('#ember-testing').empty();
      // maybe destroy all the add-hoc objects

      callbacks.teardown(container);
    }
  };

  module(description, _callbacks);
}

// allow arbitrary named factories, like rspec let
function buildContextVariables(context) {
  var cache = { };
  var callbacks = context.__setup_properties__;
  var factory = context.factory;
  var container = context.container;

  Ember.keys(callbacks).filter(function(key){
    // ignore the default setup/teardown keys
    return key !== 'setup' && key && 'teardown';
  }).forEach(function(key){
    context[key] = function(options) {
      if (cache[key]) {
        return cache[key];
      }

      var result = callbacks[key](factory(), options, container);
      cache[key] = result;
      return result;
    };
  });
}

export function test(testName, callback) {
  var context = __testing_context__; // save refence

  function wrapper() {
    buildContextVariables(context);

    var subject = context.subject;
    var container = context.container;

    var result = callback.call(context);

    Ember.run(function(){
      stop();
      Ember.RSVP.Promise.cast(result)['finally'](start);
    });
  }

  QUnit.test(testName, wrapper);
}

export function moduleForModel(name, description, callbacks) {
  moduleFor('model:' + name, description, callbacks, function(factory, container, context) {
    // custom model specific awesomeness
    container.register('store:main', DS.Store);
    container.register('adapter:application', DS.FixtureAdapter);

    context.__setup_properties__.store = function(){
      return container.lookup('store:main');
    };
  });
}

export function moduleForComponent(name, description, callbacks) {
  // just a spike...
  moduleFor('component:' + name, description, callbacks, function(factory, container, context) {

    context.__setup_properties__.$ = function(selector) {
      var view = Ember.run(function(){
        return context.subject().appendTo(Ember.$('#ember-testing')[0]);
      });

      return view.$();
    };
  });
}

