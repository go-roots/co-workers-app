const express = require('express');
const router = express.Router();
const { getFilteredUsers, registerRfidOrBilling, acceptFriendReq,
    updateFriendReq, updateMessages, updateForNolinkedinUser } = require('../controllers/users');
const { protect, authorize } = require('../middlewares/auth');
const { check } = require('express-validator');


//Bring advancedResults middleware and required models
const User = require('../models/User');
const advancedResults = require('../middlewares/advancedResults');

router.route("/light/:userId").get(protect, advancedResults(User, null, 'single'), getFilteredUsers);
router.route("/extended/:userId").get(protect, advancedResults(User, ['room', 'profile'], 'single'), getFilteredUsers);

router.route('/light').get(protect, advancedResults(User, null), getFilteredUsers);
router.route('/extended').get(protect, advancedResults(User, ['room', 'profile']), getFilteredUsers);

router.route('/message/:userId').post([protect, [
    check('message', "The comment body can't be empty").not().isEmpty()
]], updateMessages);

router.route('/admin/:userId').put(protect, authorize('admin'), registerRfidOrBilling);
router.route('/nolinkedin').put(protect, updateForNolinkedinUser);
router.route('/friendReq/:userId').put(protect, updateFriendReq);
router.route('/friendReq/accept/:userId').put(protect, acceptFriendReq);


module.exports = router