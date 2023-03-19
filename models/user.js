const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const testUserSchema = new mongoose.Schema({
  name: String,
  email: {type: String, required: true, lowercase: true, unique: true},
  password: String,
}, {
  timestamps: true,
});

testUserSchema.pre('save', function(next) {
  const user = this;
  console.log(`presave user body`);
  console.log(user);
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    console.log(user);
    next();
  })
});

testUserSchema.methods.comparePassword = function(tryPassword, cb) {
  console.log(`hitting comparePassword method in testUser model`)
  // 'this' represents the document that you called comparePassword on
  bcrypt.compare(tryPassword, this.password, function(err, isMatch) {
    console.log(`hitting bcrypt compare`)
    console.log(tryPassword);
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('TestUser', testUserSchema);