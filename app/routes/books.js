import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('book');
  },

  actions: {

    editBookTitle(book) {
      book.set('isEditing', true);
    },

    cancelBookTitleEdit(book) {
      book.set('isEditing', false);
      book.rollbackAttributes();
    },

    saveBookTitle(book) {
      if (book.get('isInvalid')) {
        return;
      }

      book.set('isEditing', false);
      book.save();
    }

  }

});
