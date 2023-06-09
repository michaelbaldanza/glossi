const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');

/*---------- Public Routes ----------*/
router.get('/id/:id', usersCtrl.getUserById);
router.get('/:username', usersCtrl.getByUsername);
router.post('/login', usersCtrl.login);
router.post('/signup', usersCtrl.signup);
router.get('/profile', usersCtrl.index);

/*---------- Protected Routes ----------*/
router.use(require('../../config/auth'));

module.exports = router;