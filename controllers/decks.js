const Deck = require('../models/deck');
const Scroll = require('../models/scroll');
const User = require('../models/user');
const Card = require('../models/card');
const Definition = require('../models/definition');
const Note = require('../models/note');

async function deleteDeck(req, res) {
  const deckId = req.params.id;
  const deck = await Deck.findById(deckId);
  // delete the deck
  deck.deleteOne();
  // but the deck still exists as this program runs
  const user = await User.findById(deck.createdBy);
  // remove reference to deck from user's deck array
  user.decks = user.decks.filter(deckRef => deckRef !== deckId);
  // find and delete cards. also find cards' associated definitions and delete them
  const cardsNum = deck.cards.length;
  if (cardsNum > 0) {
    for (let i = 0; i < cardsNum; i++) {
      const card = await Card.findById(deck.cards[i]);
      await card.deleteOne();
      // find and delete definitions and notes on definitions
      const defsNum = card.definitions.length;
      if (defsNum > 0) {
        for (let j = 0; j < defsNum; j++) {
          const def = await Definition.findById(card.definitions[j]);
          await def.deleteOne();
          // find and delete notes on definitions
          const defNotesNum = def.notes.length;
          if (defNotesNum > 0) {
            for (let k = 0; k < defNotesNum; k++) {
              await Note.findByIdAndDelete(def.notes[k]);
            }
          }
        }
      }
      // find and delete notes on cards
      const cardNotesNum = card.notes.length;
      if (cardNotesNum > 0) {
        for (let l = 0; l < cardNotesNum; l++) {
          await Note.findByIdAndDelete(card.notes[l]);
        }
      }
    }
  }
  res.json(true)
}

async function get(req, res) {
  const id = req.params.id;
  const deck = req.deck ?? await Deck.
    findById(id).
    populate({
      path: 'cards',
      populate: { path: 'createdBy', path: 'definitions' },
    }).
    populate('createdBy');
  res.json(deck);
}

async function index(req, res) {
  const decks = await Deck.find({}).sort({createdAt: 'desc'}).populate('createdBy');
  res.json(decks);
}

async function update(req, res) {
  const deckId = req.params.id;
  const deck = await Deck.findById(deckId);
  deck.name = req.body.name;
  deck.modifiedPaths();
  deck.save();
  res.json(deck);
}

module.exports = {
  delete: deleteDeck,
  get: get,
  index: index,
  update: update,
};