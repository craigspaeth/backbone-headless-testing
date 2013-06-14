var express = require('express')
  , path = require('path')
  , _ = require('underscore')
  , app = express();

// Minimal express setup that renders an index page
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
  res.render('index');
});

// Simle API to mock a DB
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

app.listen(4000, function(){ console.log('Listening on 4000') });