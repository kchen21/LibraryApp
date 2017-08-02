import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.createRecord('library');
  },

  setupController: function (controller, model) {
    this._super(controller, model);

    controller.set('title', 'Add a new local library');
    controller.set('buttonLabel', 'Add');
  },

  renderTemplate() {
    this.render('libraries/form');
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
