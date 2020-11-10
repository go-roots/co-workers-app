const mongoose = require('mongoose');

//Add an identifier to the notification
//Add realtime server to notifications
//Display an alert in react on notification push

const NotificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["event", "friend-request", "help-request", "post-help-request", "recommendation-comments", "awards"]
    },
    text: {
        type: String
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    trigger: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    everyone: {
        type: Boolean
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Notification', NotificationSchema);