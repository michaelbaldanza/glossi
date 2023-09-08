const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collaboratorSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  canAddOwnCards: { type: Boolean, default: false, },
  canEditOthersCards: { type: Boolean, default: false, },
  canAddOwnNotes: { type: Boolean, default: false, },
  canEditOthersNotes: { type: Boolean, default: false, },
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
  collaborators: [collaboratorSchema],
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card'}],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Deck', deckSchema);