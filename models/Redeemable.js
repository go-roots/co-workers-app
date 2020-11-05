const mongoose = require('mongoose');


const RedeemableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please, add a name for the redeemable'],
        unique: true
    },
    description: {
        type: String
    },
    photo: {
        type: String,
        match: [
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please add a valid photo url'
        ]
    },
    price: {
        type: Number,
        required: [true, 'Please, provide a price to the redeemable']
    }
});


module.exports = mongoose.model('redeemable', RedeemableSchema);