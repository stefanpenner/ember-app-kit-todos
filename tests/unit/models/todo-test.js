import { test , moduleForModel } from 'appkit/tests/helpers/module-for';
var Promise = Ember.RSVP.Promise;

moduleForModel('todo', 'Unit - Todo');

test("it exists", function() {
  var todo = this.subject();

  todo.should.be.ok;
});

test('artificial promise thing', function () {
  Ember.run(function(){
    // TODO:  https://github.com/emberjs/ember.js/pull/4176
    wait();
    return new Promise(function(resolve) {
      Ember.run.later(function(){

        true.should.be.ok;

        resolve("seems good");
      }, 1000);
    });
  });
});
