import DS from 'ember-data';
import Ember from 'ember';
import Faker from 'faker';

export default DS.Model.extend({

  title: DS.attr('string'),
  releaseYear: DS.attr('string'),
  library: DS.belongsTo('library', {inverse: 'books', async: true}),
  author: DS.belongsTo('author', {inverse: 'books', async: true}),

  isInvalid: Ember.computed.empty('title'),

  randomize(author, library) {
    this.set('title', this._bookTitle());
    this.set('author', author);
    this.set('releaseYear', this._randomYear());
    this.set('library', library);

    return this;
  },

  _bookTitle() {
    return `${Faker.commerce.productName()} Design`;
  },

  _randomYear() {
    return new Date(this._getRandomArbitrary(1900, 2015).toPrecision(4)).getFullYear();
  },

  _getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

});
