const express = require('express');
const router = express.Router();
const scrollsCtrl = require('../../controllers/scrolls');

/*---------- Protected Routes ----------*/
router.use(require('../../config/auth'));
router.post('/save', scrollsCtrl.create);

module.exports = router;