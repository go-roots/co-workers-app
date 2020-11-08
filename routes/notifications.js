const express = require('express')
const router = express.Router()
const { protect } = require('../middlewares/auth')
const { getNotifByUser } = require('../controllers/notifications')


router.route('/me').get(protect, getNotifByUser);


module.exports = router;