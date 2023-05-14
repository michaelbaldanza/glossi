const Scroll = require('../models/scroll');
const User = require('../models/user');
const Deck = require('../models/deck');
const Card = require('../models/card');

async function create(req, res) {
  const scrolls = await Scroll.find({});
  console.log(scrolls)
  console.log(`There are ${scrolls} scrolls`);
  console.log(`hitting create scroll`)
  const userId = req.user._id;
  const scroll = new Scroll(req.body);
  scroll.createdBy = req.user._id;
  const scribe = await User.findById(userId);
  scribe.scrolls.push(scroll._id);
  console.log(scroll)
  try {
    await scribe.save();
    await scroll.save();
    res.json(scroll);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}

async function deleteScroll(req, res) {
  console.log(`hitting deleteScroll`)
  const scroll = await Scroll.findById(req.params.id);
  const user = await User.findById(scroll.createdBy);
  const scrollIdx = user.scrolls.indexOf(req.params.id);
  user.scrolls.splice(scrollIdx, 1);
  user.save();
  await Scroll.findByIdAndDelete(req.params.id);
  res.json('delete successful');
}

async function index(req, res) {
  const scrolls = await Scroll.find({}).sort({createdAt: 'desc'}).populate('createdBy');
  res.json(scrolls);
}

async function get(req, res) {
  const scroll = await Scroll.findById(req.params.id).populate('createdBy');
  // const scroll = await Scroll.findById(req.params.id).populate('createdBy').populate('decks');
  res.json(scroll);
}

async function update(req, res) {
  const scrollId = req.params.id;
  const scroll = await Scroll.findById(scrollId);
  scroll.title = req.body.title;
  scroll.body = req.body.body;
  scroll.modifiedPaths();
  scroll.save();
  res.json(scroll);
}

module.exports = {
  create: create,
  delete: deleteScroll,
  index: index,
  get: get,
  update: update,
};