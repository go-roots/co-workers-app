const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// A user might have a linkedin connection so he doesn't need to have firstName, 
// lastName, email, password in the db.

/* messages: {
    type: [{
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
    }],
    select: false
} */

const UserSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    linkedin: String,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
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
    friends: {
        friends: {
            type: [{
                friend: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'user'
                },
                createdAt: {
                    type: Date,
                    default: Date.now
                },
                firstName: String,
                lastName: String
            }]
        },
        friendRequests: {
            type: [{
                user: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'user'
                },
                firstName: String,
                lastName: String,
                createdAt: {
                    type: Date,
                    default: Date.now
                }
            }]
        }
    },
    messages: [
        {
            from: {
                type: mongoose.Schema.ObjectId,
                ref: 'user'
            },
            text: String,
            firstName: String,
            lastName: String,
            seen: {
                type: Boolean,
                default: false
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    cwpoints: {
        current: Number,
        history: [
            {
                date: {
                    type: Date,
                    default: Date.now
                },
                value: Number,
                description: String
            }
        ]
    },
    rfid: {
        type: String,
        unique: true,
        sparse: true
    },
    stats: {
        seniority: {
            lastEnteredAt: Date,
            lastLeftAt: Date,
            totalTimeSpentInCW: Number
        }
    },
    electricityConsumptionLogs: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            value: Number
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
                amount: Number
            }
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

//Reverse populate with Profile and Room virtuals
UserSchema.virtual('profile', {
    ref: 'Profile',
    localField: '_id',
    foreignField: 'user',
    justOne: true
});

UserSchema.virtual('room', {
    ref: 'Room',
    localField: '_id',
    foreignField: 'users.user',
    justOne: true
});


//Encrypt password using bcrypt middleware
UserSchema.pre('save', async function (next) {
    //as long as the password is not modified, skip it
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//Sign jwt token and return it
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

//Match user entered password with hashed password in the db
UserSchema.methods.matchPasswords = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


module.exports = mongoose.model('User', UserSchema);