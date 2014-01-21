import TodoController from 'appkit/todos/item-controller/controller';
import { moduleFor, test } from 'appkit/tests/helpers/module_for';

var todo;
moduleFor('controller:todos/item-controller', 'Unit - TodoController', {
  subject: function(factory) {
    todo = mock({
      isComplete: true
    });

    return factory.create({
      model: todo
    });
  }
});

function mock(properties) {
  return Ember.Object.create(properties || {});
}

test('isComplete: get', function(){
  var controller = this.subject();

  equal(controller.get('isComplete'), true);

  todo.set('isComplete', false);

  equal(controller.get('isComplete'), false);
});

test('isComplete: set', function(){
  var controller = this.subject();

  equal(controller.get('isComplete'), true);
  equal(todo.get('isComplete'), true);

  controller.set('isComplete', false);

  equal(controller.get('isComplete'), false);
  equal(todo.get('isComplete'), false);
});

test('actions: editTodo', function(){
  var controller = this.subject();

  equal(todo.get('isEditing', false));
  controller.send('editTodo');
  equal(todo.get('isEditing', true));
});

test('actions: removeTodo', function(){
  expect(2);

  var controller = this.subject();

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

  var controller = this.subject();

  todo.save = function() {
    ok(true, 'expected Record#save');
  };

  equal(todo.get('isEditing', true));
  controller.send('acceptChanges');
  equal(todo.get('isEditing', false));
});

