const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  heading: String,
  body: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User'},
}, {
  timestamps: true,
});

const definitionSchema = new Schema({
  definition: String,
  senses: [this],
  examples: [String],
  synonyms: [String],
  antonyms: [String],
  notes: [noteSchema],
  source: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User'},
}, {
  timestamps: true,
});

const cardSchema = new Schema({
  title: { type: String, required: true },
  partOfSpeech: String,
  definitions: [definitionSchema],
  notes: [noteSchema],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  citation: {
    scroll: { type: Schema.Types.ObjectId, ref: 'Scroll' },
    location: String,
  },
  decks: [{ type: Schema.Types.ObjectId, ref: 'Deck' }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Card', cardSchema);