import TodosController from 'appkit/controllers/todos';

module("Unit - TodosController");

function mock(properties) {
  return Ember.Object.create(properties);
}

test("inflection", function(){

  var controller = TodosController.create({});

  equal(controller.get('inflection'), 'items');

  Ember.run(function () {
    controller.pushObject(mock({
      isCompleted: false
    }));
  });

  equal(controller.get('inflection'), 'item');

  Ember.run(function () {
    controller.pushObject(mock({
      isCompleted: false
    }));
  });

  equal(controller.get('inflection'), 'items');
});

test("aggregates", function(){
  var todo1 = mock({ isCompleted: false });
  var todo2 = mock({ isCompleted: false });
  var todo3 = mock({ isCompleted: false });

  var controller = TodosController.create({
    model: [
      todo1,
      todo2,
      todo3,
    ]
  });

  deepEqual(controller.get('active'), [todo1, todo2, todo3]);
  deepEqual(controller.get('completed'), []);
  equal(controller.get('hasCompleted'), false);
  equal(controller.get('allAreDone'), false);

  todo1.set('isCompleted', true);

  deepEqual(controller.get('active'), [todo2, todo3]);
  deepEqual(controller.get('completed'), [todo1]);
  equal(controller.get('hasCompleted'), true);
  equal(controller.get('allAreDone'), false);

  todo2.set('isCompleted', true);

  deepEqual(controller.get('active'), [todo3]);
  deepEqual(controller.get('completed'), [todo1, todo2]);
  equal(controller.get('hasCompleted'), true);
  equal(controller.get('allAreDone'), false);

  todo3.set('isCompleted', true);

  deepEqual(controller.get('active'), []);
  deepEqual(controller.get('completed'), [todo1, todo2, todo3]);
  equal(controller.get('hasCompleted'), true);
  equal(controller.get('allAreDone'), true);
});

test("allAreDone: get", function(){
  var controller = TodosController.create();
  var todo1 = mock();
  var todo2 = mock();

  equal(controller.get('allAreDone'), false);

  controller.pushObject(todo1);
  equal(controller.get('allAreDone'), false);

  controller.pushObject(todo2);
  equal(controller.get('allAreDone'), false);

  todo1.set('isCompleted', true);
  equal(controller.get('allAreDone'), false);

  todo2.set('isCompleted', true);
  equal(controller.get('allAreDone'), true);

  todo2.set('isCompleted', false);
  equal(controller.get('allAreDone'), false);
});

test("allAreDone: set", function(){
  var todo1 = mock();
  var todo2 = mock();

  var controller = TodosController.create({
    model: [
      todo1,
      todo2
    ]
  });

  controller.set('allAreDone', true);

  equal(todo1.get('isCompleted'),  true);
  equal(todo2.get('isCompleted'),  true);

  controller.set('allAreDone', false);

  equal(todo1.get('isCompleted'), false);
  equal(todo2.get('isCompleted'), false);
});
