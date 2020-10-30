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
    description: {
        type: String
    },
    reward: {
        type: Number
    }
});


module.exports = mongoose.model('Award', AwardSchema);