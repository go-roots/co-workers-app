const express = require('express');
const router = express.Router();
const { getFilteredUsers, registerRfidOrBilling, acceptFriendReq,
    addFriendReq, deleteFriendReq, sendMessage, deleteMessage,
    updateForNolinkedinUser, deleteFriend } = require('../controllers/users');
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
]], sendMessage);

router.route('/admin/:userId').put(protect, authorize('admin'), registerRfidOrBilling);
router.route('/nolinkedin').put(protect, updateForNolinkedinUser);

router.route('/friendReq/:userId').put(protect, addFriendReq);
router.route('/friendReq/:userId').delete(protect, deleteFriendReq);
router.route('/friendReq/res/:userId').put(protect, acceptFriendReq);

router.route('/friend/:userId').delete(protect, deleteFriend);
router.route('/message/:msgId').delete(protect, deleteMessage);


module.exports = router