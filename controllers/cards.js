const Card = require('../models/card');
const Deck = require('../models/deck');
const Definition = require('../models/definition');
const Scroll = require('../models/scroll');
const User = require('../models/user');

async function create(req, res) {
  console.log(`hitting create`)
  const newCard = req.body;
  const card = new Card();
  const user = await User.findById(req.user._id);
  const scroll = await Scroll.findById(newCard.citation.scroll);
  // create a new deck or find the old deck by id
  let deck;
  if (newCard.deckId && newCard.deckId.length) {
    deck = await Deck.findById(newCard.deckId)
    .then(deck => {
      return deck;
    });
  } else if (newCard.deckName && newCard.deckName.length) {
    deck = new Deck({name: newCard.deckName, createdBy: user._id});
    user.decks.push(deck._id);
  }
  newCard.deck = deck._id;
  // Create definition documents
  newCard.definitions.map((def, idx) => {
    const definition = new Definition(def);
    definition.createdBy = user._id;
    definition.card = card._id;
    definition.save();
    newCard.definitions.splice(idx, 1, definition._id);
  });
  newCard.createdBy = user._id;
  Object.assign(card, newCard);
  deck.cards.push(card._id);
  scroll.cards.push(card._id);
  user.cards.push(card._id);
  try {
    user.save();
    card.save();
    deck.save();
    scroll.save();
    // console.log(`did all that save?`)
    // console.log(user)
    // console.log(deck);
    // console.log(scroll);
    await card.populate('deck')
    console.log(card);
    res.json(card);
  } catch {
    res.status(400).json(err);
  }
}

async function get(req, res) {
  console.log(`hitting card controller`)
  const card = await Card.findById(req.params.id)
    .populate('definitions')
    .populate('deck')
    .populate('createdBy')
  ;

  return res.json(card);
}

module.exports = {
  create: create,
  get: get,
};