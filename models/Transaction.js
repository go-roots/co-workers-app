const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
    redeemable: {
        type: mongoose.Schema.ObjectId,
        ref: 'redeemable'
    },
    status: {
        type: String,
        enum: ['ongoing', 'fulfilled', 'cancelled'],
        default: 'ongoing'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);