const express = require('express');
const router = express.Router();
const decksCtrl = require('../../controllers/decks');

router.get('/', decksCtrl.index);
router.get('/:id', decksCtrl.get);

/*---------- Protected Routes ----------*/
router.use(require('../../config/auth'));
router.put('/:id', decksCtrl.update);
router.delete('/:id/delete', decksCtrl.delete);

module.exports = router;