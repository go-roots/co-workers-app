const mongoose = require('mongoose');


const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    mainActivitySector: {
        type: String,
        required: [true, 'Please, select an activity sector']
    },
    company: {
        type: String,
        required: [true, 'Please, select a company you a working in, or unemployed if unemployed']
    },
    photo: {
        type: String,
        match: [
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please add a valid profile photo url'
        ]
    },
    website: {
        type: String,
        match: [
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please add a valid website url'
        ]
    },
    position: {
        type: String
    },
    skills: {
        type: [String],
        required: [true, 'Please, select an activity sector']
    },
    bio: {
        type: String
    },
    status: {
        type: String,
        enum: ['Available', 'Do not disturb', 'Invisible'],
        default: 'Available'
    },
    mood: {
        type: String,
        enum: ['Prefer to stay alone', 'Feeling sociable', 'Willing to help others'],
        default: 'Feeling sociable'
    },
    story: {
        type: [String]
    },
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Profile', ProfileSchema);