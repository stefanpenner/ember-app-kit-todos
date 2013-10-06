import Todos from 'appkit/routes/todos';

var route;

module('Unit - TodosRoute', {
  setup: function(){
    route = Todos.create();
  },
  teardown: function(){
    Ember.run(route, 'destroy');
  }
});

test('it exists', function(){
  ok(route);
  ok(route instanceof Ember.Route);
});
