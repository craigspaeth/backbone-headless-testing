var clientenv = require('../helpers/client_env');

describe('Todos', function() {
  
  var todos;
  
  beforeEach(function(done) {
    clientenv.setup(function() {
      require('../../public/javascripts/models/todo');
      require('../../public/javascripts/collections/todos');
      todos = new App.Todos([
        { title: 'Feed the cat' },
        { title: 'Take out the trash', completed: true }
      ]);
      done();
    });
  });
  
  describe('model', function() {
    
    it('adds todo items', function() {
      todos.add({});
      todos.last().get('completed').should.not.be.ok
    });
  });
});