const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scrollSchema = new Schema({
  title: String,
  body: String,
  source: String,
  draft: { type: Boolean, default: false },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Scroll', scrollSchema);