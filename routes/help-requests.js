const express = require('express');
const router = express.Router()
const { getReceivedHelpReq, getSentHelpReq, getHelpReq,
    createHelpReq, updateHelpReq } = require('../controllers/help-requests')
const { protect, authorize } = require('../middlewares/auth')


router.route('/').get(protect, authorize('admin'), getHelpReq);
router.route('/:status').get(protect, authorize('admin'), getHelpReq);

router.route('/sent/:userId/:status').get(protect, getSentHelpReq);
router.route('/sent/:userId').get(protect, getSentHelpReq);

router.route('/received/:userId/:status').get(protect, getReceivedHelpReq);
router.route('/received/:userId').get(protect, getReceivedHelpReq);

router.route('/').post(protect, createHelpReq);

router.route('/:reqId').put(protect, updateHelpReq);


module.exports = router;