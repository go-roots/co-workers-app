const Redeemable = require('../models/Redeemable')
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

//Get all the redeemables
exports.getRedeemables = asyncHandler(async (req, res, next) => {
    const redeemables = await Redeemable.find();
    res.status(200).json(redeemables);
});