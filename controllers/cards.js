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

async function deleteCard(req, res) {
  const cardId = req.params.id;
  const card = await Card.findById(cardId);
  const defsNum = card.definitions.length;
  if (defsNum > 0) {
    for (let j = 0; j < defsNum; j++) {
      const def = await Definition.findById(card.definitions[j]);
      await def.deleteOne();
      console.log(def)
      // find and delete notes on definitions
      const defNotesNum = def.notes.length;
      if (defNotesNum > 0) {
        for (let k = 0; k < defNotesNum; k++) {
          console.log(`logging defNotes`)
          console.log(def.notes[k])
          await Note.findByIdAndDelete(def.notes[k]);
        }
      }
    }
  }
  const deck = await Deck.findById(card.deck);
  deck.cards = deck.cards.filter(deckCard => String(deckCard) !== String(card._id));
  deck.save();
  await card.deleteOne();
  res.json('delete successful');
}

async function get(req, res) {
  console.log(`hitting card controller`)
  const card = await Card.findById(req.params.id)
    .populate('createdBy')
    .populate('definitions')
  ;

  return res.json(card);
}

module.exports = {
  create: create,
  delete: deleteCard,
  get: get,
};