const Notification = require('../models/Notification')
const asyncHandler = require('../middlewares/async')
const ErrorReponse = require('../utils/errorResponse')


// @desc        Get my notifs
// @route       GET api/cw-api/notifications/me
// @access      Private
exports.getNotifByUser = asyncHandler(async (req, res, next) => {
    const notifications = await Notification.find({ receiver: req.user.id }).sort('-createdAt');
    res.status(200).json({ success: true, count: notifications.length, data: notifications });
});

// @desc        Update seen notification
// @route       UPDATE api/cw-api/notifications/:notifId
// @access      Private
exports.updateSeenNotification = asyncHandler(async (req, res, next) => {
    const { notifId } = req.params;
    const notification = await Notification.findOne({ _id: notifId, receiver: req.user.id });

    if (!notification) {
        return next(new ErrorReponse(400, `No notification with id ${notifId} found for this user`));
    }

    const updateNotif = notification;
    updateNotif.seen = true;

    const newNotification = await Notification.findByIdAndUpdate(
        notifId,
        { $set: updateNotif },
        { new: true }
    )

    res.status(200).json({ success: true, data: newNotification });
});