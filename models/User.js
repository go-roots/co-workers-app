const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    firstName: {
        type: String,
        required: [true, 'Please add a firstName']
    },
    lastName: {
        type: String,
        required: [true, 'Please add a lastName']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        minlength: 6,
        select: false //We disable by default the ability to get the password from db
    },
    friends: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'user'
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    messages: [
        {
            from: {
                type: mongoose.Schema.ObjectId,
                ref: 'user'
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
            text: {
                type: String
            }
        }
    ],
    cwpoints: {
        type: Number
    },
    stats: {
        seniority: {
            lastEnteredAt: {
                type: Date
            },
            lastLeftAt: {
                type: Date
            },
            totalTimeSpentInCW: {
                type: Number
            }
        }
    },
    electricityConsumptionLogs: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            value: {
                type: Number
            }
        }
    ],
    billing: {
        contractType: {
            type: String,
            enum: ["basic", "standard", "premium"]
        },
        bills: [
            {
                date: {
                    type: Date,
                    default: Date.now
                },
                amount: {
                    type: Number
                }
            }
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('User', UserSchema);