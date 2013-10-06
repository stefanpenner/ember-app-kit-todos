import Todos from 'appkit/routes/todos';

var route;

module("Unit - TodosRoute", {
  setup: function(){
    var container = isolatedContainer([
      'route:todos'
    ]);

    route = container.lookup('route:todos');
  }
});

test("it exists", function(){
  ok(route);
  ok(route instanceof Ember.Route);
});
