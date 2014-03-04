import TodosRoute from 'appkit/todos/route';

var route, expectedModel, store;

suite('Unit - TodosRoute', {
  setup: function(){
    store = { };

    route = TodosRoute.create({
      store: store
    });
  },
  teardown: function(){
    Ember.run(route, 'destroy');
  }
});

test('it exists', function(){
  route.should.be.ok;
  route.should.be.an.instanceof(Ember.Route);
});

test('#model', function(){
  expectedModel = {
    id: '1',
    title: 'install EAK',
    isCompleted: true
  };

  store.find = sinon.spy(function(type) {
    return expectedModel;
  });

  route.model().should.eql(expectedModel);
  store.find.calledOnce.should.be.ok;
  store.find.calledWith('todo').should.be.ok;
});
