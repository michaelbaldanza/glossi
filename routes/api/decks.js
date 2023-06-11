const express = require('express');
const router = express.Router();
const decksCtrl = require('../../controllers/decks');

router.get('/', decksCtrl.index);
router.get('/:id', decksCtrl.get);

module.exports = router;