const express = require('express');
const router = express.Router();
const scrollsCtrl = require('../../controllers/scrolls');

router.get('/:id', scrollsCtrl.show);

/*---------- Protected Routes ----------*/
router.use(require('../../config/auth'));
router.post('/save', scrollsCtrl.create);

module.exports = router;