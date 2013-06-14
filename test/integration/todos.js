var Browser = require('zombie'),
    app = require('../../app'),
    sinon = require('sinon'),
    _ = require('underscore');

describe('Adding a todo and completing it', function() {
  
  var browser, $, ajaxSpy;
  
  before(function(done) {
    app.listen('5000', function() {
      console.log('Test server listening on 5000');
      Browser.visit('http://localhost:5000', function(err, b) {
        browser = b;
        $ = browser.window.$;
        ajaxSpy = sinon.spy($, 'ajax');
        browser.wait(function(){
          browser.window.$(function(){
            done();
          });
        });
      });
    });
  });
  
  it('Adds the todo, renders the todos, and crosses it out when done', function(done) {
    $('#add-todo').val('Foo').change();
    browser.wait(function() {
      $('#todos li').length.should.be.above(2);
      $('#todos li:last-child .complete-todo').click();
      JSON.parse(_.last(ajaxSpy.args)[0].data).completed.should.be.ok;
      $('#todos li:last-child').hasClass('completed').should.be.ok
      done()
    });
  });
});