const express = require('express');
const router = express.Router();
const { getUser, getUsers, deleteAccountAdmin } = require('../controllers/users');
const { protect, authorize } = require('../middlewares/auth');


router.route("/:userId").get(protect, getUser);
router.route('/:userId').delete(protect, authorize('admin'), deleteAccountAdmin);
router.route('/').get(protect, getUsers);


module.exports = router