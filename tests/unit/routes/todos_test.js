import TodosRoute from 'appkit/todos/route';

var route, expectedModel, store;

module('Unit - TodosRoute', {
  setup: function(){
    store = { };

    route = TodosRoute.create({
      store: store
    });
  },
  teardown: function(){
    Ember.run(route, 'destroy');
  }
});

test('it exists', function(){
  expect(2);

  ok(route);
  ok(route instanceof Ember.Route);
});

test('#model', function(){
  expect(2);

  expectedModel = {
    id: '1',
    title: 'install EAK',
    isCompleted: true
  };

  store.find = function(type) {
    equal(type, 'todo');

    return expectedModel;
  };

  equal(route.model(), expectedModel, 'did not correctly invoke store');
});
