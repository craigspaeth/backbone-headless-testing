var Browser = require('zombie'),
    app = require('../../app');

describe('Adding a todo and completing it', function() {
  
  var browser;
  
  before(function(done) {
    app.listen('5000', function() {
      console.log('Test server listening on 5000');
      Browser.visit('http://localhost:5000')
    });
  });
  
  it('Adds the todo, renders the todos, and crosses it out when done', function() {
    
  });
});