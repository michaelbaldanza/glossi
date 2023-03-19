const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');

/*---------- Public Routes ----------*/
router.post('/login', usersCtrl.login);
router.post('/signup', usersCtrl.signup);

/*---------- Protected Routes ----------*/

module.exports = router;