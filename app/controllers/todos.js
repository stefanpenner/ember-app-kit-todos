// controllers/todos.js

var isEmpty  = Ember.isEmpty;
var filterBy = Ember.computed.filterBy;
var notEmpty = Ember.computed.notEmpty;

var TodosController = Ember.ArrayController.extend({
  active:    filterBy('[]', 'isCompleted', false),
  completed: filterBy('[]', 'isCompleted', true),
  hasCompleted: notEmpty('completed.[]'),

  inflection: function () {
    var active = this.get('active.length');
    return active === 1 ? 'item' : 'items';
  }.property('active.[]'),

  allAreDone: function (key, value) {
    if (arguments.length === 2) {
      this.setEach('isCompleted', value);
      this.invoke('save');
      return value;
    } else {
      return !isEmpty(this) && this.everyProperty('isCompleted', true);
    }
  }.property('@each.isCompleted'),

  actions: {
    createTodo: function () {
      // Get the todo title set by the "New Todo" text field
      var title = this.get('newTitle');
      if (!title.trim()) { return; }

      // Create the new Todo model
      var todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });

      // Clear the "New Todo" text field
      this.set('newTitle', '');

      // Save the new model
      todo.save();
    },
    clearCompleted: function () {
      var completed = this.filterProperty('isCompleted', true);
      completed.invoke('deleteRecord');
      completed.invoke('save');
    }
  }
});

export default TodosController;
