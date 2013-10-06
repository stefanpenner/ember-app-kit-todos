// controllers/todos.js
var TodosController = Ember.ArrayController.extend({
  active: Ember.computed.filterBy('model', 'isCompleted', false),
  completed: Ember.computed.filterBy('model', 'isCompleted', true),
  hasCompleted: Ember.computed.notEmpty('completed.[]'),

  inflection: function () {
    var active = this.get('active');
    return active === 1 ? 'item' : 'items';
  }.property('active'),

  allAreDone: function (key, value) {
    if (value === undefined) {
      return this.everyProperty('isCompleted', true);
    } else {
      this.setEach('isCompleted', value);
      this.invoke('save');
      return value;
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
