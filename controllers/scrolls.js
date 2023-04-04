const Scroll = require('../models/scroll');

async function create(req, res) {
  const existing = await Scroll.find({})
    .then(allScrolls => {
      console.log(allScrolls);
    });
  const scroll = new Scroll(req.body);
  scroll.createdBy = req.user._id;
  try {
    await scroll.save()
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}

module.exports = {
  create: create,
};