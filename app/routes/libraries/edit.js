import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return this.store.findRecord('library', params.library_id);
  },

  setupController: function (controller, model) {
    this._super(controller, model);

    controller.set('title', 'Edit library');
    controller.set('buttonLabel', 'Save changes');
  },

  renderTemplate() {
    this.render('libraries/form');
  },

  actions: {

    saveLibrary(library) {
      library.save().then(() => this.transitionTo('libraries'));
    },

    willTransition(transition) {

      let model = this.controller.get('model');

      if (model.get('hasDirtyAttributes')) {
        let confirmation = confirm("Your changes haven't been saved. Would you like to leave without saving?");

        if (confirmation) {
          model.rollbackAttributes();
        } else {
          transition.abort();
        }
      }

    }

  }

});
