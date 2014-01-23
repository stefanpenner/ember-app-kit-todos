import Todo from 'appkit/models/todo';
import { test , moduleForModel } from 'appkit/tests/helpers/module_for';
var Promise = Ember.RSVP.Promise;

moduleForModel('Todo');

test('exists', function(){
  ok(Todo, 'expected todo to exist');
});

test('artificial promise thing', function () {
  return Ember.run(function(){
    // TODO:  https://github.com/emberjs/ember.js/pull/4176
    return new Promise(function(resolve) {
      Ember.run.later(function(){

        ok(true, "no really, seems good");
        resolve("seems good");
      }, 1000);
    });
  });
});
