const mongoose = require('mongoose');


const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please, provide a title to the event']
    },
    organizer: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, 'Who is the organizer huh ?']
    },
    image: {
        type: String,
        match: [
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please add a valid photo url'
        ]
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    capacity: {
        type: Number
    },
    attending: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'user'
            },
            attendedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
});


module.exports = mongoose.model('Event', EventSchema);