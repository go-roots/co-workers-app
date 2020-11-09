const mongoose = require('mongoose');


const HelpRequestSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, 'Who is the initiator of the help request huh ?']
    },
    targetedUsers: {
        type: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'user'
            }
        ],
        required: [true, 'A request must target at least one user']
    },
    status: {
        type: String,
        enum: ['ongoing', 'accepted', 'cancelled', 'expired'],
        required: [true, 'Provide a state']
    },
    question: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Help-request', HelpRequestSchema);