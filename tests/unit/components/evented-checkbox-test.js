import {
  moduleForComponent,
  test
} from 'ember-qunit';

import Ember from "ember";

var run = Ember.run;

moduleForComponent('evented-checkbox', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('it updates when clicked, and triggers the action', function(assert) {
  var changedActionCallCount = 0;
  var component = this.subject({
    value: 'foo',
    action: 'checked',
    checked: false,
    targetObject: Ember.Controller.createWithMixins({
      actions: {
        checked: function() {
          changedActionCallCount++;
        }
      }
    })
  });

  this.render();

  assert.equal(changedActionCallCount, 0);
  assert.equal(component.$().prop('checked'), false);

  run(function() {
    component.$().trigger('click');
  });

  assert.equal(component.$().prop('checked'), true, 'updates element property');
  assert.equal(component.get('checked'), true, 'updates component property');

  assert.equal(changedActionCallCount, 1);
});
