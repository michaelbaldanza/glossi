const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const termSchema = new Schema({
  term: { type: String, required: true, },
  definitions: [String],
  partOfSpeech: { type: String, required: true },
  etymology: { type: String, },
}, {
  timestamps: true,
});

const deckSchema = new Schema({
  name: { type: String, default: 'new deck'},
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  terms: [termSchema],
  scrolls: [{type: Schema.Types.ObjectId, ref: 'Deck'}],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Deck', deckSchema);