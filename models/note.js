const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  heading: String,
  body: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true, },
  parent: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'parentModel',
  },
  parentModel: {
    type: 'String',
    required: true,
    enum: ['Card', 'Definition']
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Note', noteSchema);