App.Todos = Backbone.Collection.extend({
  
  model: App.Todo,
  
  url: '/api/todos'

});
