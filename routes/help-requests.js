const express = require('express');
const router = express.Router()
const { getReceivedHelpReq, getSentHelpReq, countHelpReq,
    createHelpReq, updateHelpReq } = require('../controllers/help-requests')
const { protect } = require('../middlewares/auth')


router.route('/:status').get(protect, countHelpReq);
router.route('/sent/:userId').get(protect, getSentHelpReq);
router.route('/received/:userId').get(protect, getReceivedHelpReq);
router.route('/sent/:userId/?:status').get(protect, getSentHelpReq);
router.route('/received/:userId/?:status').get(protect, getReceivedHelpReq);

router.route('/').post(protect, createHelpReq);

router.route('/:reqId').put(protect, updateHelpReq);


module.exports = router;