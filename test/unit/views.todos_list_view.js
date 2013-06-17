var clientenv = require('../helpers/client_env'),
    sinon = require('sinon'),
    path = require('path'),
    fs = require('fs');

describe('TodosListView', function() {
  
  var view, ajaxStub;
  
  beforeEach(function(done) {
    clientenv.setup(function() {
      
      // Require our app dependencies
      require('../../public/javascripts/models/todo');
      require('../../public/javascripts/collections/todos');
      require('../../public/javascripts/views/todos_list_view');
      
      // Compile our server-side template and render it in jsdom
      var templateFilename = path.resolve(__dirname, '../../views/index.jade'),
          html = require('jade').compile(
            fs.readFileSync(templateFilename).toString(),
            { filename: templateFilename }
          )();
      $('html').html(html);
      
      // Require our view and stub ajax
      view = new App.TodosListView();
      ajaxStub = sinon.stub($, 'ajax'),
      done();
    });
  });
  
  afterEach(function(){
    ajaxStub.restore();
  });
  
  describe('#initialize', function() {
    
    it('fetches todos and renders them', function() {
      view.initialize();
      ajaxStub.args[0][0].success([
        { title: 'Write better ajax tests', completed: true },
      ]);
      view.$el.html().should.include('Write better ajax tests');
    });
    
    it('binds events to render', function(){
      var spy = sinon.spy(view, 'render');
      view.initialize();
      view.todos.trigger('add');
      view.todos.trigger('remove');
      view.todos.trigger('change:completed');
      spy.callCount.should.equal(3);
    });
  });
  
  describe('#addTodo', function() {
    
    it('saves a new todo item', function() {
      view.todos.reset([]);
      view.addTodo({ target: $("<input value='Write more tests'>") });
      view.todos.length.should.be.above(0);
      ajaxStub.args[0][0].url.should.equal('/api/todos');
      ajaxStub.args[0][0].type.should.equal('POST');
    });
  });
  
  describe('#deleteTodo', function() {
    
    it('deletes the selected todo item', function() {
      var $fixture = $("<ul><li><input id='target'</li></ul>")
      view.todos.reset([{ title: 'Remove me', id: 'delete-me' }]);
      view.deleteTodo({ target: $fixture.find('#target') });
      view.todos.length.should.equal(0);
      ajaxStub.args[0][0].url.should.equal('/api/todos/delete-me');
      ajaxStub.args[0][0].type.should.equal('DELETE');
    });
  });
  
  describe('#toggleComplete', function() {
    
    it("saves the todo as completed if it's not", function() {
      var $fixture = $("<ul><li><input id='target'</li></ul>")
      view.todos.reset([{ title: 'Complete me', id: 'complete-me', completed: false }]);
      view.toggleComplete({ target: $fixture.find('#target') });
      ajaxStub.args[0][0].url.should.equal('/api/todos/complete-me');
      ajaxStub.args[0][0].type.should.equal('PUT')
      JSON.parse(ajaxStub.args[0][0].data).completed.should.be.ok;
    });
  });
});