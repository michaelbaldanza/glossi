const Deck = require('../models/deck');

async function get(req, res) {
  const id = req.params.id;
  const deck = await Deck.findById(id).populate('cards');
  res.json(deck);
}

async function index(req, res) {
  console.log(`hitting decks index`)
  const decks = await Deck.find({}).sort({createdAt: 'desc'}).populate('createdBy');
  console.log(decks)
  res.json(decks);
}



module.exports = {
  get: get,
  index: index,
};