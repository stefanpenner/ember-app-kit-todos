var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function(){
  this.route('component-test');
  
  this.resource('todos', { path: "/" }, function() {
    // additional child routes
  });
});

export default Router;
