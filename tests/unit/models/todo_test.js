import { test , moduleForModel } from 'appkit/tests/helpers/module_for';
var Promise = Ember.RSVP.Promise;

moduleForModel('todo', 'descrption');

test("the model", function() {
  var todo = this.subject();

  ok(todo);
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
