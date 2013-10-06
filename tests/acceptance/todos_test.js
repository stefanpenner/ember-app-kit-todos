var App;

module("Acceptances - Todos", {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test("todos renders", function(){
  expect(7);

  visit('/').then(function(){
    ok(exists("#new-todo"));
    ok(exists("#toggle-all"));

    var list = find("#todo-list li");
    equal(list.length, 3);
    
    ok(exists("#todo-count"));
    
    var linkList = find("#filters li");
    equal(linkList.length, 3);
    
    ok(exists("#clear-completed"));
    ok(exists("#info"));
  });
});
