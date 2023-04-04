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
}, {
  timestamps: true,
});

// const testUserSchema = new mongoose.Schema({
//   name: String,
//   email: {type: String, required: true, lowercase: true, unique: true},
//   password: String,
// }, {
//   timestamps: true,
// });


userSchema.pre('save', function(next) {
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

userSchema.methods.comparePassword = function(tryPassword, cb) {
  console.log(`hitting comparePassword method in testUser model`)
  // 'this' represents the document that you called comparePassword on
  bcrypt.compare(tryPassword, this.password, function(err, isMatch) {
    console.log(`hitting bcrypt compare`)
    console.log(tryPassword);
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);

// testUserSchema.pre('save', function(next) {
//   const user = this;
//   console.log(`presave user body`);
//   console.log(user);
//   if (!user.isModified('password')) return next();
//   bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
//     if (err) return next(err);
//     user.password = hash;
//     console.log(user);
//     next();
//   })
// });

// testUserSchema.methods.comparePassword = function(tryPassword, cb) {
//   console.log(`hitting comparePassword method in testUser model`)
//   // 'this' represents the document that you called comparePassword on
//   bcrypt.compare(tryPassword, this.password, function(err, isMatch) {
//     console.log(`hitting bcrypt compare`)
//     console.log(tryPassword);
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };