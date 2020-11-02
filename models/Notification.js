const mongoose = require('mongoose');


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
    }
})


module.exports = mongoose.model('Notification', NotificationSchema);