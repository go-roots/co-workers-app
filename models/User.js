const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// A user might have a linkedin connection so he doesn't need to have firstName, 
// lastName, email, password in the db. 

const UserSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
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