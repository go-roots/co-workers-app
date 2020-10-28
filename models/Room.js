const mongoose = require('mongoose');


const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please, add a name for the room'],
        unique: true
    },
    capacity: {
        type: Number,
        unique: true
    },
    users: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'user'
            },
            enteredAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    facilities: {
        type: [String],
        enum: ['TV screen', 'conference room', 'whiteboard', 'video-projector']
    }
});


module.exports = mongoose.model('Room', RoomSchema)