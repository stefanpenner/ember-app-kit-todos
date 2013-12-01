// routes/todos/completed.js

export default Ember.Route.extend({
  model: function(){
    return this.store.filter('todo', function (todo) {
      return todo.get('isCompleted');
    });
  },
  renderTemplate: function(controller){
    this.render('todos/index', { controller: controller });
  }
});
