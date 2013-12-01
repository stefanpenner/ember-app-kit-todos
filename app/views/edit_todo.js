// views/edit_todo.js
export default Ember.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
  }
});
