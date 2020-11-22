const mongoose = require('mongoose');


const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please, provide a title to the event']
    },
    organizer: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        default: mongoose.Types.ObjectId("5d7a514b5d2c12c7449be042")
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
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Event', EventSchema);