import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('contact');
  },

  actions: {

    deleteContactMessage(contactMessage) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        contactMessage.destroyRecord();
      }
    }

  }

});
