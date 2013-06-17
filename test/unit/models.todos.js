var clientenv = require('../helpers/client_env');

describe('Todo', function() {
  
  var todo;
  
  beforeEach(function(done) {
    clientenv.setup(function() {
      require('../../public/javascripts/models/todo');
      todo = new App.Todo({ title: 'Feed the cat' });
      done();
    });
  });
  
  describe('defaults', function() {
    
    it('defaults to not completed', function() {
      todo  = new App.Todo();
      todo.get('completed').should.not.be.ok
    });
  });
});