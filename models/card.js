const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  title: { type: String, required: true },
  partOfSpeech: String,
  languageCode: String,
  definitions: [{type: Schema.Types.ObjectId, ref: 'Definition'}],
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note'}],
  synonyms: [String],
  antonyms: [String],
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
  deck: { type: Schema.Types.ObjectId, ref: 'Deck', required: true, },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Card', cardSchema);