import { test , moduleForComponent } from 'appkit/tests/helpers/module-for';

moduleForComponent('edit-todo');

test("asdf", function(){
  this.subject().should.be.an.instanceof(Ember.Component);
  this.$().is('input').should.be.ok;
  this.$().is('.focus').should.be.ok;
});
