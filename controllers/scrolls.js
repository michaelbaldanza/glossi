const Scroll = require('../models/scroll');
const User = require('../models/user');
const Deck = require('../models/deck');
const Card = require('../models/card');
const Definition = require('../models/definition');

async function create(req, res) {
  const userId = req.user._id;
  const scroll = new Scroll(req.body);
  const isDraft = req.body.isDraft === 'on' ? true : false;
  scroll.isDraft = isDraft;
  scroll.createdBy = req.user._id;
  const scribe = await User.findById(userId);
  scribe.scrolls.push(scroll._id);
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
  scroll.deleteOne();
  res.json('delete successful');
}

async function index(req, res) {
  const scrolls = await Scroll.find({isDraft: false}).sort({createdAt: 'desc'}).populate('createdBy');
  res.json(scrolls);
}

async function get(req, res) {
  const scroll = await Scroll.findById(req.params.id).populate('createdBy');
  res.json(scroll);
}

async function update(req, res) {
  const scrollId = req.params.id;
  const scroll = await Scroll.findById(scrollId);
  const { title, body, isDraft } = req.body;
  scroll.isDraft = isDraft === 'on' ? true : false;
  scroll.title = title;
  scroll.body = body;
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


async function DELETE_ALL() {
  const resources = [Scroll, User, Deck, Card, Definition];
  for (let i = 0; i < resources.length; i++) {
    try {
      await resources[i].deleteMany({});
    } catch (err){
      console.error(err);
    }
  }
  console.log('deleted')
}