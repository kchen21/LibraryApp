import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.createRecord('library');
  },

  actions: {

    saveLibrary(newLibrary) {
      newLibrary.save().then(() => this.transitionTo('libraries'));
    },

    willTransition() {
      //rollbackAttributes() removes the record from the store
      //if the model 'isNew' (has not been saved to the database)
      this.controller.get('model').rollbackAttributes();
    }

  }

});
