const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
  },
  password: { type: String, },
  bio: { type: String, },
  profilePictureUrl: { type: String, },
  scrolls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scroll' }],
  decks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deck' }],
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
}, {
  timestamps: true,
});

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  })
});

userSchema.methods.comparePassword = function(tryPassword, cb) {
  // 'this' represents the document that you called comparePassword on
  bcrypt.compare(tryPassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);