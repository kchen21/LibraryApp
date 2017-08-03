import Ember from 'ember';
import Faker from 'faker'

export default Ember.Controller.extend({

  actions: {

    generateLibraries(volume) {
      this.set('generateLibrariesInProgress', true);

      const counter = parseInt(volume);
      let savedLibraries = [];

      for (let i=0; i < counter; i++) {
        // Collect all Promises in an array
        savedLibraries.push(this._saveRandomLibrary());
      }

      // Wait for all Promises to fulfill so we can show our label and turn off the spinner
      Ember.RSVP.all(savedLibraries)
        .then(() => {
          this.set('generateLibrariesInProgress', false);
          this.set('librariesCreateDone', true);
        });
    },

    deleteLibraries() {
      this.set('deleteLibrariesInProgress', true);

      // Our local _destroyAll returns a promise
      this._destroyAll(this.get('libraries'))
        .then(() => {
          this.set('librariesDeleteDone', true);
          this.set('deleteLibrariesInProgress', false);
        });
    },

    generateBooksWithAuthors(volume) {
      this.set('generateBooksInProgress', true);

      const counter = parseInt(volume);
      let booksWithAuthors = [];

      for (let i=0; i < counter; i++) {
        const books = this._saveRandomAuthor().then(newAuthor => this._generateSomeBooks(newAuthor));
        booksWithAuthors.push(books);
      }

      Ember.RSVP.all(booksWithAuthors)
        .then(() => {
          this.set('booksCreateDone', true);
          this.set('generateBooksInProgress', false);
        });
    },

    deleteBooksWithAuthors() {
      this.set('deleteBooksInProgress', true);

      const authors = this.get('authors');
      const books = this.get('books');

      this._destroyAll(authors)
        .then(() => this._destroyAll(books))
        .then(() => {
          this.set('booksDeleteDone', true);
          this.set('deleteBooksInProgress', false);
        });
    },

  },
  
  // Private methods

  // returns a Promise because saving to the database is a Promise
  _saveRandomLibrary() {
    return this.store.createRecord('library').randomize().save();
  },

  _saveRandomAuthor() {
    return this.store.createRecord('author').randomize().save();
  },

  _generateSomeBooks(author) {
    const bookCounter = Faker.random.number(10);
    let books = [];

    for (let i = 0; i < bookCounter; i++) {
      const library = this._selectRandomLibrary();

      const bookPromise =
      this.store.createRecord('book')
      .randomize(author, library)
      .save()
      .then(() => author.save())
      // guard library in case we don't have any libraries
      .then(() => library && library.save());

      books.push(bookPromise);
    }

    // Return a Promise, so we can manage the whole process on time
    return Ember.RSVP.all(books);
  },

  _selectRandomLibrary() {
    // Please note libraries are records from store, which means this is a DS.RecordArray object, extended from
    // Ember.ArrayProxy. If we need an element from this list, we cannot just use libraries[3]; we have to use
    // libraries.objectAt(3)
    const libraries = this.get('libraries');
    const size = libraries.get('length');

    // Get a random number between 0 and size - 1
    const randomIndex = Faker.random.number(size - 1);

    return libraries.objectAt(randomIndex);
  },

  _destroyAll(records) {
    // destroyRecord is a Promise and will be fulfilled when the backend database has confirmed the delete
    // Let's collect these Promises in an array
    const recordsAreBeingDestroyed = records.map(item => item.destroyRecord());

    // Wrap all the Promises in one common Promise
    return Ember.RSVP.all(recordsAreBeingDestroyed);
  }

});
