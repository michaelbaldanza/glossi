const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scrollSchema = new Schema({
  title: { type: String, },
  body: { type: String, required: true },
  source: { type: String, },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  decks: [{ type: Schema.Types.ObjectId, ref: 'Deck' }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Scroll', scrollSchema);