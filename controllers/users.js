const User = require('../models/user');
const Deck = require('../models/deck');
const Scroll = require('../models/scroll');
const Card = require('../models/card');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

function createJWT(user) {
  return jwt.sign(
    {user},
    SECRET,
    {expiresIn: '24h'},
  );
}

async function getUserById(req, res) {
  console.log(`hitting getUserById`)
  const user = await User.findById(req.params.id).populate('decks');
  console.log(user)
  res.json(user);
}

async function getByUsername(req, res) {
  const user = await User.findOne({ username: req.params.username }).populate({
    path: 'scrolls',
    options: { sort: {createdAt: 'desc'}}
  });
  res.json(user);
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
  const deck = new Deck({
    name: `${user.username}'s deck`,
    createdBy: user._id,
  });
  user.decks.push(deck._id);
  try {
    await user.save().then(savedUser => {
      if (savedUser === user) {
        deck.save();
      }
    });
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
    console.log(err)
  };
}

async function indexUserScrolls(req, res) {
  if (req.user) {
    console.log(`LOOKING FOR USER SCROLLS`)
    const user = await User.findById(req.user._id).exec();
    await user.populate('scrolls');
    res.json(user.scrolls);
  } else {
    const scrolls = await Scroll.find({}).sort({createdAt: 'desc'}).limit(5);
    res.json(scrolls);
  } 
}

module.exports = {
  getUserById: getUserById,
  getByUsername: getByUsername,
  login: login,
  signup: signup,
  index: indexUserScrolls,
}