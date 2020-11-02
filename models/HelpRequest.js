const mongoose = require('mongoose');


const HelpRequestSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, 'Who is the initiator of the help request huh ?']
    },
<<<<<<< HEAD
    targetedUsers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'user',
            required: [true, 'A request must target at least one user']
        },
    ],
=======
    targetedUsers: {
        type: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'user'
            }
        ],
        required: [true, 'A request must target at least one user']
    },
>>>>>>> 64e53ac196bd3f05354201bed6411319cbef99b4
    status: {
        type: String,
        enum: ['ongoing', 'resolved', 'canceled', 'expired'],
        required: [true, 'Provide a state']
    },
    tags: {
        type: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Help-request', HelpRequestSchema);