const express = require('express');
const router = express.Router();
const decksCtrl = require('../../controllers/decks');
const { CustomError, isPrivate, makeActionStr } = require('../../controllers/errors');
const Deck = require('../../models/deck');


router.get('/:id', decksCtrl.get);

router.use(require('../../config/auth'));
router.get('/', decksCtrl.index);
router.get('/:id/edit', getDeckErr, decksCtrl.get);
router.put('/:id', getDeckErr, decksCtrl.update);
router.delete('/:id', getDeckErr, decksCtrl.delete);

module.exports = router;

async function getDeckErr(req, res, next) {
  try {
    const deckId = req.params.id;
    const deck = await Deck.findById(deckId).populate('createdBy');
    if (!deck) {
      throw new CustomError(`No deck with _id ${deckId} exists.`, 404);
    } else {
      req.deck = deck;
    }

    const user = req.user;
    const actionStr = makeActionStr(req);
    const private = isPrivate(req);
    if (!private || user && deck.createdBy._id.toString() === user._id) {
      next();
    } else if (!user) {
      throw new CustomError(
        `If this deck belongs to you, log in to ${actionStr} it.`,
        401
      );
    } else {
      throw new CustomError(
        `Can't ${actionStr} deck.`,
        403
      );
    }
  } catch(err) {
    next(err);
  }
}