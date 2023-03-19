const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET_KEY;

function createJWT(user) {
  return jwt.sign(
    {user},
    SECRET,
    {expiresIn: '24h'},
  );
}

async function signup(req, res) {
  const user = new User(req.body);
  console.log(user);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  };
}

module.exports = {
  signup: signup,
}