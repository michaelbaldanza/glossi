const User = require('../models/user');
const Scroll = require('../models/scroll');
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
  try {
    const user = await User.findOne({ $or: [
      {username: req.body.emailOrUsername},
      {email: req.body.emailOrUsername}
    ]});
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
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
    console.log(err)
  };
}

async function indexUserScrolls(req, res) {
  console.log(`LOOKING FOR USER SCROLLS`)
  const user = await User.findById(req.user._id).exec();
  // console.log(`logging user`)
  // console.log(user);
  await user.populate('scrolls');
  const scrolls = user.scrolls;
  res.json(user.scrolls);
}

module.exports = {
  login: login,
  signup: signup,
  index: indexUserScrolls,
}