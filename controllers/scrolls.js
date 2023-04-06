const Scroll = require('../models/scroll');
const User = require('../models/user');

async function create(req, res) {
  const userId = req.user._id;
  const existing = await Scroll.find({})
    .then(allScrolls => {
      console.log(allScrolls);
    });
  const scroll = new Scroll(req.body);
  scroll.createdBy = req.user._id;

  const scribe = await User.findById(userId);
  scribe.scrolls.push(scroll);
  scribe.save();
  console.log(scribe);
  try {
    await scroll.save()
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}

async function show(req, res) {
  const scroll = await Scroll.findById(req.params.id);
  console.log(scroll)
  res.json(scroll);
}

module.exports = {
  create: create,
  show: show,
};