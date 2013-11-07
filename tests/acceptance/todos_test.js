import Todo from 'appkit/models/todo';
var App;

module('Acceptances - Todos', {
  setup: function(){
    // setup fixtures
    Todo.reopenClass({
      FIXTURES: [
        {
          id: "1",
          title: 'install EAK',
          isCompleted: true
        },
        {
          id: "2",
          title: 'install additional dependencies',
          isCompleted: true
        },
        {
          id: "3",
          title: 'develop amazing things',
          isCompleted: false
        }
    ]});

    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

function remainingCountText(){
  return Number($('#todo-count strong').text());
}

var notCompletedSelector = "#todo-list li:not('.completed') input";
var completedSelector = "#todo-list li.completed input";

function notCompleted() {
  return $(notCompletedSelector);
}

function completed() {
  return $(completedSelector);
}

function mock(options) {
  return Ember.$.extend(true, {}, options);
}

function insertNewline(selector) {
  // should be improved, and likely made an official helper
  var id = $(selector).attr('id');
  var view = Ember.View.views[id];
  if (view) {
      view.insertNewline(new Ember.$.Event('kewdown'));
  } else {
    throw new Error('Could not insertNewline on: `' + selector + '`, because it was not found, or was not an ember-view');
  }
}

test('todos renders', function(){
  expect(7);

  visit('/').then(function(){
    ok(exists('#new-todo'));
    ok(exists('#toggle-all'));

    var list = find('#todo-list li');
    equal(list.length, 3);

    ok(exists('#todo-count'));

    var linkList = find('#filters li');
    equal(linkList.length, 3);

    ok(exists('#clear-completed'));
    ok(exists('#info'));
  });
});

test('todos mark last completed', function(){
  expect(6);

  visit('/').then(function(){
    equal(1, notCompleted().length, 'expected 1 uncompleted');
    equal(1, remainingCountText());
    equal(2, completed().length);

    click(notCompletedSelector).then(function(){
      equal(0, notCompleted().length, 'expected 0 uncompleted');
      equal(0, remainingCountText());
      equal(3, completed().length);
    });
  });
});

test('todos mark one uncompleted', function(){
  expect(6);

  visit('/').then(function(){
    equal(1, notCompleted().length, 'expected 1 uncompleted');
    equal(1, remainingCountText());
    equal(2, completed().length);

    click(completedSelector + ':first').then(function(){
      equal(2, notCompleted().length, 'expected 0 uncompleted');
      equal(2, remainingCountText());
      equal(1, completed().length);
    });
  });
});

test('clear completed', function(){
  expect(6);

  visit('/').then(function(){
    equal(1, notCompleted().length, 'expected 1 uncompleted');
    equal(1, remainingCountText());
    equal(2, completed().length);

    click('#clear-completed').then(function(){
      equal(1, notCompleted().length, 'expected 3 uncompleted');
      equal(1, remainingCountText());
      equal(0, completed().length);
    });
  });
});

test("create todo", function(){
  expect(4);
  visit('/').then(function(){
    fillIn('#new-todo', 'bro');
    Ember.run(null, insertNewline, '#new-todo');
    equal(2, notCompleted().length, 'expected 1 uncompleted');
    equal(2, remainingCountText());
    equal(2, completed().length);
    equal('bro', $('ul#todo-list li label:last').text());
  });
});

test("remove todo", function(){
  expect(3);
  visit('/').then(function(){
    click('#todo-list li.completed button.destroy').then(function(){
      equal(1, notCompleted().length, 'expected 1 uncompleted');
      equal(1, remainingCountText());
      equal(0, completed().length);
    });
  });
});
