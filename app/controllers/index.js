import Ember from 'ember';

export default Ember.Controller.extend({

  emailAddress: '',

  // isDisabled: Ember.computed('emailAddress', function() {
  //   return this.get('emailAddress') === '';
  // })

  // short syntax
  isDisabled: Ember.computed.empty('emailAddress')

});
