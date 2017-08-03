import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'span',

  classNames: ['label label-success label-fade'],
  classNameBindings: ['isShowing:label-show'],

  isShowing: false,

  isShowingChanged: Ember.observer('isShowing', function() {
    // If the user navigates away from this page in fewer than 3 seconds, this component will be destroyed.
    // However, our "setTimeout" task will try to run.
    // We save this task to a local variable, so it can be cleaned up during the destroy process.
    // Otherwise, we will encounter a "calling set on destroyed object" error.
    this._runLater = Ember.run.later(() => this.set('isShowing', false), 3000);
  }),

  resetRunLater() {
    this.set('isShowing', false);
    Ember.run.cancel(this._runLater);
  },

  willDestroy() {
    this.resetRunLater();
    this._super(...arguments);
  }

});
