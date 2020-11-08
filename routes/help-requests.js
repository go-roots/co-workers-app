const express = require('express');
const router = express.Router()
const { getReceivedHelpReq, getSentHelpReq, countHelpReq,
    createHelpReq, updateHelpReq } = require('../controllers/help-requests')
const { protect, authorize } = require('../middlewares/auth')


router.route('/:status').get(protect, authorize('admin'), countHelpReq);
router.route('/sent/:userId').get(protect, authorize('admin'), getSentHelpReq);
router.route('/received/:userId').get(protect, authorize('admin'), getReceivedHelpReq);

router.route('/').post(protect, createHelpReq);

router.route('/:reqId').put(protect, updateHelpReq);


module.exports = router;