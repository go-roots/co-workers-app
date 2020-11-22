const Notification = require('../models/Notification')
const asyncHandler = require('../middlewares/async')
const ErrorReponse = require('../utils/errorResponse')


// @desc        Get my notifs
// @route       GET api/cw-api/notifications/me
// @access      Private
exports.getNotifByUser = asyncHandler(async (req, res, next) => {
    const notifications = await Notification.find({ $or: [{ receiver: req.user.id }, { broadcast: true }] }).sort('-createdAt');
    res.status(200).json({ success: true, count: notifications.length, data: notifications });
});


//Add filters by notification type if we have time