import Ember from 'ember';

export default Ember.Controller.extend({

  emailAddress: '',
  message: '',
  responseMessage: '',

  isValidEmail: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  isValidMessage: Ember.computed.gte('message.length', 5),
  isValid: Ember.computed.and('isValidEmail', 'isValidMessage'),
  isDisabled: Ember.computed.not('isValid'),

  actions: {

    sendMessage() {
      alert(`The following message: ${this.get('message')}, from ${this.get('emailAddress')}, is being sent...`);
      this.set('responseMessage', "We have received your message and will get in touch soon.")
      this.set('emailAddress', '');
      this.set('message', '');
    }

  }

});
