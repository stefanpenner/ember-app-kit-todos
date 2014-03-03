document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

Ember.testing = true;

window.startApp          = require('appkit/tests/helpers/start-app')['default'];
window.isolatedContainer = require('appkit/tests/helpers/isolated-container')['default'];

function exists(selector) {
  return !!find(selector).length;
}

Ember.Test.adapter = Ember.Test.MochaAdapter.create();

Mocha.test = test;

$(document).ready(function(){
  mocha.checkLeaks();
  mocha.globals([
    'visit',
    'click',
    'keyEvent',
    'fillIn',
    'find',
    'findWithAssert',
    'wait',
    'andThen',
    'triggerEvent',
    'LiveReload',
    'currentRouteName',
    'currentPath',
    'currentURL'
  ]);
  mocha.run();
});
