const mongoose = require('mongoose');

//the identifier can be anything that links to the event that triggered the notif
//awards notif are left aside by now.

const NotificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["event", "friend-request", "help-request", "accept-help-request", "post-help-request", "recommendation-comments", "awards"]
    },
    title: String,
    receiver: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    trigger: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    seen: {
        type: Boolean,
        default: false
    },
    identifier: mongoose.Schema.ObjectId,
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Notification', NotificationSchema);