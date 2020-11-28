const express = require('express')
const router = express.Router()
const { protect } = require('../middlewares/auth')
const { getNotifByUser, updateSeenNotification } = require('../controllers/notifications')


router.route('/me').get(protect, getNotifByUser);
router.route('/:notifId').put(protect, updateSeenNotification);


module.exports = router;