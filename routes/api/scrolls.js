const express = require('express');
const router = express.Router();
const scrollsCtrl = require('../../controllers/scrolls');

router.get('/', scrollsCtrl.index);
router.get('/:id', scrollsCtrl.get);

/*---------- Protected Routes ----------*/
router.use(require('../../config/auth'));
router.post('/save', scrollsCtrl.create);
router.put('/:id', scrollsCtrl.update);
router.delete('/:id/delete', scrollsCtrl.delete);

module.exports = router;