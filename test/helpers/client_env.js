// 
// Sets up an environment that mimics a browser by globally exposing pieces
// such as a DOM with jsdom, the App namespace that components attach to,
// and any other libraries commonly expected to be globally exposed like Backbone
// Underscore, and jQuery. This allows us speedily to test client-side components
// without the drag of running a browser, headless or real.
// 

var jsdom = require ('jsdom'),
    jade = require('jade'),
    fs = require('fs'),
    path = require('path');

module.exports.setup = setup = function(callback) {
  if(typeof window != 'undefined') return callback(window);
  
  // Compile our server-side template to be plugged into jsdom
  var templateFilename = path.resolve(__dirname, '../../views/index.jade'),
      html = require('jade').compile(
        fs.readFileSync(templateFilename).toString(),
        { filename: templateFilename }
      )();
  
  // Setup a jsdom env and globally expose window along with other libraries
  jsdom.env({
    html: html,
    done: function(errs, window) {
      global.window = window;
      global.Backbone = require('../../public/javascripts/vendor/backbone.js');
      global.Backbone.$ = global.$ = require('../../public/javascripts/vendor/jquery.js');
      global._ = require('../../public/javascripts/vendor/underscore.js');
      global.App = {};
      callback();
    }
  });
  
}