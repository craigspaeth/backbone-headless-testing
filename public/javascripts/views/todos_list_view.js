App.TodosListView = Backbone.View.extend({
  
  el: '#todos',
  
  template: function(data) {
    return _.template($('#todos-template').html(), data);
  },
  
  initialize: function() {
    _.bindAll(this);
    this.todos = new App.Todos();
    this.todos.on('add remove change:completed', this.render);
    this.todos.fetch();
    this.$('#add-todo').focus();
  },
  
  render: function() {
    this.$('ul').html(this.template({ todos: this.todos.models }));
  },
  
  events: {
    'change #add-todo': 'addTodo',
    'click .delete-todo': 'deleteTodo',
    'click .complete-todo, a': 'toggleComplete'
  },
  
  addTodo: function(e) {
    var todo = new App.Todo({ title: $(e.target).val() });
    this.todos.add(todo);
    todo.save()
    $(e.target).val('').focus();
  },
  
  deleteTodo: function(e) {
    this.todos.at($(e.target).parent().index()).destroy();
  },
  
  toggleComplete: function(e) {
    var todo = this.todos.at($(e.target).parent().index())
    todo.save({ completed: !todo.get('completed') });
  }
  
});