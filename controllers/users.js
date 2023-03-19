const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

function createJWT(user) {
  return jwt.sign(
    {user},
    SECRET,
    {expiresIn: '24h'},
  );
}

async function login(req, res) {
  console.log(`hitting login user function`)
  console.log(req.body);
  try {
    const user = await User.findOne({email: req.body.email});
    console.log(user ? 'found a user' : 'no user found');
    console.log(user);
    if (!user) return res.status(401).json({err: 'bad credentials'});
    console.log(`getting past the condition in login`)
    user.comparePassword(req.body.password, (err, isMatch) => {
      console.log(`comparing req.body and user password`)
      console.log(req.body.password)
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        console.log(`getting bad credentials in login?`)
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function signup(req, res) {
  console.log('hitting sign up')
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  };
}

module.exports = {
  login: login,
  signup: signup,
}