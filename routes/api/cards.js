const express = require('express');
const router = express.Router();
const cardsCtrl = require('../../controllers/cards');

router.get('/:id', cardsCtrl.get);

/*---------- Protected Routes ----------*/
router.use(require('../../config/auth'));
router.post('/', cardsCtrl.create);
router.delete('/:id/delete', cardsCtrl.delete);

module.exports = router;