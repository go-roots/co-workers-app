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
    photo: String,
    price: {
        type: Number,
        required: [true, 'Please, provide a price to the redeemable']
    }
});


module.exports = mongoose.model('redeemable', RedeemableSchema);