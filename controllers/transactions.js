const User = require('../models/User');
const Redeemable = require('../models/Redeemable');
const Transaction = require('../models/Transaction');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');


//This controller is dealing with a transaction lifecycle

let timer;

// @description     GET all transactions
// @route           POST /api/cw-api/transactions
// @access          Private
exports.getTransactions = asyncHandler(async (req, res, next) => {
    const transactions = await Transaction.find();
    res.status(200).json({ success: true, data: transactions });
})

// @description     Create a transaction
// @route           POST /api/cw-api/transactions
// @access          Private
exports.initateTransaction = asyncHandler(async (req, res, next) => {
    const { redeemableId } = req.body;

    const redeemable = await Redeemable.findById(redeemableId);

    if (!redeemable) {
        return next(new ErrorResponse(`No redeemable found with the id ${redeemableId}`, 404));
    }

    const transaction = await Transaction.create({ redeemable: redeemableId });

    //Cancellation timer for transaction expiry
    timer = setTimeout(async () => {
        transaction.status = 'cancelled';
        await transaction.save();
    }, 1000 * 5 * 60);

    res.status(201).json({ success: true, data: { transaction: transaction._id, redeemable: redeemable.name } });
});

// @description     Terminate a transaction
// @route           POST /api/cw-api/transactions/validate
// @access          Private
exports.fulfillTransaction = asyncHandler(async (req, res, next) => {
    const { transactionId, rfid, redeemable } = req.body;

    //Find and validate transaction
    const transaction = await Transaction.findById(transactionId).populate('redeemable');

    if (!transaction) {
        return next(new ErrorResponse(`No transaction found with the id of ${transactionId}`, 404));
    }

    if (transaction.status == 'cancelled') {
        return next(new ErrorResponse(`Transaction with the id ${transactionId} has been cancelled`, 403));
    }

    //update user's cwpoints
    const user = await User.findOne({ rfid });

    if (!user) {
        return next(new ErrorResponse(`No user found with the rfid ${rfid}`, 404));
    }

    if (user.cwpoints.current < transaction.redeemable.price) {
        transaction.status = 'cancelled';
        await transaction.save();
        return next(new ErrorResponse('Insufficient funds', 403));
    }

    //Terminate transaction
    clearTimeout(timer);

    user.cwpoints.current -= transaction.redeemable.price;
    user.cwpoints.history.unshift({
        value: transaction.redeemable.price,
        description: `Redeemed ${transaction.redeemable.price} of his points to get a ${redeemable}`
    })
    await user.save();

    transaction.status = 'fulfilled';
    await transaction.save();

    res.status(200).json({ success: true, data: { cwpoints: user.cwpoints.current } });
});