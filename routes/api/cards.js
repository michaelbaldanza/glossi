const express = require('express');
const router = express.Router();
const cardsCtrl = require('../../controllers/cards');
const Card = require('../../models/card');
const { checkAuth, CustomError, isPrivate, makeActionStr } = require('../../controllers/errors');

router.get('/:id', cardsCtrl.get);

/*---------- Protected Routes ----------*/
router.use(require('../../config/auth'));
router.post('/', checkAuth({ message: 'Log in to create a card.' }), cardsCtrl.create);
router.delete('/:id', getCardErr, cardsCtrl.delete);

module.exports = router;

async function getCardErr(req, res, next) {
  try {
    const cardId = req.params.id;
    const card = await Card.findById(cardId).populate('createdBy');
    if (!card) {
      throw new CustomError(`No card with _id ${cardId} exists.`, 404);
    } else {
      req.card = card;
    }

    const user = req.user;
    const actionStr = makeActionStr(req);
    const private = isPrivate(req);
    if (!private || user && card.createdBy._id.toString() === user._id) {
      next();
    } else if (!user) {
      throw new CustomError(
        `If this card belongs to you, log in to ${actionStr} it.`,
        401
      );
    } else {
      throw new CustomError(
        `Can't ${actionStr} card.`,
        403
      );
    }
  } catch(err) {
    next(err);
  }
}