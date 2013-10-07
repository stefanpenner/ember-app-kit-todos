import TodoController from 'appkit/controllers/todo';
module('Unit - TodoController');

test('existence', function(){
  ok(TodoController);
  ok(TodoController.create() instanceof TodoController);
});

function mock(properties) {
  return Ember.Object.create(properties);
}

test('isComplete: get', function(){
  var todo = mock({
    isComplete: true
  });

  var controller = TodoController.create({
    model: todo
  });

  equal(controller.get('isComplete'), true);

  todo.set('isComplete', false);

  equal(controller.get('isComplete'), false);
});

test('isComplete: set', function(){
  var todo = mock({
    isComplete: true
  });

  var controller = TodoController.create({
    model: todo
  });

  equal(controller.get('isComplete'), true);
  equal(todo.get('isComplete'), true);

  controller.set('isComplete', false);

  equal(controller.get('isComplete'), false);
  equal(todo.get('isComplete'), false);
});

test('actions: editTodo', function(){
  var todo = mock();
  var controller = TodoController.create({
    model: todo
  });

  equal(todo.get('isEditing', false));
  controller.send('editTodo');
  equal(todo.get('isEditing', true));
});

test('actions: removeTodo', function(){
  expect(2);

  var todo = mock();
  var controller = TodoController.create({
    model: todo
  });

  todo.deleteRecord = function() {
    ok(true, 'expected Record#deleteRecord');
  };

  todo.save = function() {
    ok(true, 'expected Record#save');
  };

  controller.send('removeTodo');
});

test('actions: acceptChanges', function(){
  expect(3);

  var todo = mock();
  var controller = TodoController.create({
    model: todo
  });

  todo.save = function() {
    ok(true, 'expected Record#save');
  };

  equal(todo.get('isEditing', true));
  controller.send('acceptChanges');
  equal(todo.get('isEditing', false));
});

