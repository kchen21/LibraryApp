import Ember from 'ember';

const MAX_VALUE = 100;

export default Ember.Component.extend({

  counter: null,

  isValidCounter: Ember.computed.lte('counter', MAX_VALUE),
  isInvalidCounter: Ember.computed.not('isValidCounter'),
  placeholder: `Max ${MAX_VALUE}`,

  generateReady: false,
  deleteReady: false,

  generateInProgress: false,
  deleteInProgress: false,

  generateIsDisabled: Ember.computed.or('isInvalidCounter', 'generateInProgress', 'deleteInProgress'),
  deleteIsDisabled: Ember.computed.or('generateInProgress', 'deleteInProgress'),

  actions: {

    generateAction() {
      if (this.get('isValidCounter')) {
        // Action up to Seeder Controller with the requested amount
        this.sendAction('generateAction', this.get('counter'));
      }
    },

    deleteAction() {
      this.sendAction('deleteAction');
    }

  }
});
