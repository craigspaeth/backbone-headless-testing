App.Todo = Backbone.Model.extend({  

  defaults: {
    completed: false
  },
  
  urlRoot: '/api/todos'

});
