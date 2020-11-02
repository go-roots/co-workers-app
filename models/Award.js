const mongoose = require('mongoose');


const AwardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please, provide a name for the award"],
        unique: true
    },
    conditions: [
        {
            answeredQuestions: {
                type: Number
            },
            askedQuestions: {
                type: Number
            },
            organizedEvents: {
                type: Number
            },
            periodInMonths: {
                type: Number
            },
            timeSpentInCWInHours: {
                type: Number
            },
            cwpoints: {
                type: Number
            }
        }
    ],
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
    reward: {
        type: Number
    }
});


module.exports = mongoose.model('Award', AwardSchema);