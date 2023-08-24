const express = require('express');
const router = express.Router();
const scrollsCtrl = require('../../controllers/scrolls');
const {
  checkAuth, checkCreatedBy, getScroll
} = require('../../controllers/errors');

router.use(require('../../config/auth'));

router.get( // index
  '/',
  checkCreatedBy,
  scrollsCtrl.index
);

router.get(
  '/new',
  checkAuth({ message: "Log in to create a scroll." }),
  scrollsCtrl.new
);

router.get(
  '/:id',
  getScroll,
  scrollsCtrl.get
);

router.get(
  '/:id/edit',
  getScroll,
  scrollsCtrl.get
);
router.post(
  '/',
  checkAuth({ message: "Log in to create a scroll." }),
  scrollsCtrl.create
);
router.put(
  '/:id',
  getScroll,
  scrollsCtrl.update
);
router.delete(
  '/:id',
  getScroll,
  scrollsCtrl.delete
);

module.exports = router;