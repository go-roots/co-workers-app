const express = require('express');
const router = express.Router();
const { getUserLight, getUserExtended, getUsersLight, getUsersExtended, deleteAccountAdmin } = require('../controllers/users');
const { protect, authorize } = require('../middlewares/auth');

//Bring advancedResults middleware and required models
const User = require('../models/User');
const advancedResults = require('../middlewares/advancedResults');


router.route("/light/:userId").get(protect, advancedResults(User, null, 'single'), getUserLight);
router.route("/extended/:userId").get(protect, advancedResults(User, ['room', 'profile'], 'single'), getUserExtended);

router.route('/light').get(protect, advancedResults(User, null), getUsersLight);
router.route('/extended').get(protect, advancedResults(User, ['room', 'profile']), getUsersExtended);

router.route('/:userId').delete(protect, authorize('admin'), deleteAccountAdmin);


module.exports = router