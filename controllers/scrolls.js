const Scroll = require('../models/scroll');
const User = require('../models/user');
const Deck = require('../models/deck');
const Card = require('../models/card');
const Definition = require('../models/definition');
const { CustomError } = require('./errors');

async function create(req, res) {
  console.log(`hitting create scroll`)
  const userId = req.user._id;
  const scroll = new Scroll(req.body);
  const draft = req.body.draft === 'on' ? true : false;
  scroll.draft = draft;
  scroll.createdBy = req.user._id;
  const scribe = await User.findById(userId);
  scribe.scrolls.push(scroll._id);
  try {
    await scribe.save();
    await scroll.save();
    res.json(scroll);
  } catch (err) {
    console.log(`catching err`)
    console.error(err)
    res.status(400).json(err);
  }
}

async function deleteScroll(req, res) {
  const scroll = await Scroll.findById(req.params.id);
  const user = await User.findById(scroll.createdBy);
  const scrollIdx = user.scrolls.indexOf(req.params.id);
  user.scrolls.splice(scrollIdx, 1);
  user.save();
  scroll.deleteOne();
  console.log(`Deleted ${scroll.title}`)
  res.json('delete successful');
}

async function index(req, res) {
  if (req.query.createdBy) {
    /* Replace object with the user's ID.
      Replace object with user's ID to query for the scrolls created by that user.
    */
    req.query.createdBy = req.query.createdBy._id;
  }

  if (!req.query.hasOwnProperty('draft')) {
    /* Exclude drafts from response.
      This adds a draft key to the query obect if it has none, so that drafts
      are excluded from the response by default.
    */
    req.query.draft = false;
  }

  /* Set req.query keys to the filter object. */
  const filter = { ...req.query };
  
  const scrolls = await Scroll.find(filter).sort({createdAt: 'desc'}).populate('createdBy');
  return res.json(scrolls);
}

async function get(req, res) {
  console.log(`hitting scrolls/controllers get function`)
  const scroll = req.scroll ?? await Scroll.findById(req.params.id).populate('createdBy');
  res.json(scroll);
}

async function newScroll(req, res) {
  console.log(`hitting newScroll controllers/scrolls.js`)
  res.json(null);
}

async function update(req, res) {
  const scrollId = req.params.id;
  const scroll = await Scroll.findById(scrollId);
  const { title, body, draft } = req.body;
  scroll.draft = draft === 'on' ? true : false;
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
  new: newScroll,
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