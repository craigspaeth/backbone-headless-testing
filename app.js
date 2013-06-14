var express = require('express')
  , path = require('path')
  , _ = require('underscore');
module.exports = app = express();

// Minimal express setup that renders an index page
app.set('port', 4000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
  res.render('index');
});

// Simple mock REST API
// 
// In a real app this would be refactored out into it's own routing architecture
// using a real database. Integration tests would then want to have a conditional
// here that swaps the API depending on the environment. This would allow you to 
// easily swap a mock API used for tests so that you don't wait on a real DB and 
// clobber actual data.
// 
// For instance a clean implementation of this could involve mounting your
// API as it's own express app.
// 
// ````javascript
// if(app.get('env') == 'test') {
//   app.use('/api', require('./test/helpers/mock_api'));
// } else {
//   app.use('/api', require('./routes/api'));
// }
// ````
// 
// Or you may have a more Service-oriented architecture and have your API running 
// on another server. In this case you would need to change which url the client 
// app points to.
// 
// ````javascript
// if(app.get('env') == 'test') {
//   app.set('api url', 'http://localhost:5000);
//   // Create a mock api server in your test helpers and run it on 5000 in a before block
// } else {
//   app.set('api url', 'http://api.my-app.com');
// }
// app.locals.API_URL = app.get('api url');
// ````
// 
// To keep this example simple we'll just use this in-memory API for both environments.

var todos = [
  { id: 0, title: 'Take out the trash', completed: false },
  { id: 1, title: 'Pick up milk', completed: true }
];
app.get('/api/todos', function(req, res) {
  res.send(todos);
});
app.get('/api/todos/:id', function(req, res) {
  var todo = todos.filter(function(todo){
    return todo.id == req.params.id
  })[0];
  res.send(todo);
});
app.put('/api/todos/:id', function(req, res) {
  var todo = todos.filter(function(todo){
    return todo.id == req.params.id
  })[0];
  todo = _.extend(todo, req.body);
  res.send(todo);
});
app.post('/api/todos', function(req, res) {
  var todo = req.body;
  todos.push(_.extend(todo, { id: todos.length + 1 }));
  res.send(todo);
});
app.delete('/api/todos/:id', function(req, res) {
  todos = todos.filter(function(todo){
    return todo.id != req.params.id
  });
  res.send({ success: true });
});

// Start server unless its a test environment
if(app.get('env') == 'test') return;
app.listen(app.get('port'), function(){ 
  console.log('Listening on ' + app.get('port'));
});