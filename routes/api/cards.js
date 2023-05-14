const express = require('express');
const router = express.Router();
const cardsCtrl = require('../../controllers/cards');

/*---------- Protected Routes ----------*/
router.use(require('../../config/auth'));
router.post('/', cardsCtrl.create);

module.exports = router;