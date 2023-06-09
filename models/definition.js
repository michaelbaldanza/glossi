const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const definitionSchema = new Schema({
  definition: String,
  senses: [this],
  isVisible: { type: Boolean, default: true },
  synonyms: [String],
  antonyms: [String],
  examples: [String],
  source: {
    name: String,
    link: String,
    userSubmitted: Boolean,
  },
  card: { type: Schema.Types.ObjectId, ref: 'Card' },
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Definition', definitionSchema);