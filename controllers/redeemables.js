const Redeemable = require('../models/Redeemable');
const errorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const { validationResult } = require('express-validator');


// @desc        Get all redeemables
// @route       GET api/cw-api/redeemables
// @access      Private
exports.getRedeemables = asyncHandler(async (req, res, next) => {
    const redeemables = await Redeemable.find();
    res.status(200).json(redeemables);
});

// @desc        Get single redeemable
// @route       GET api/cw-api/redeemables/:redeemableId
// @access      Private
exports.getRedeemable = asyncHandler(async (req, res, next) => {
    const redeemable = await Redeemable.findById(req.params.redeemableId);

    if (!redeemable) {
        return next(new errorResponse(`No redeemable found with the id of ${req.params.redeemableId}`));
    }

    res.status(200).json({ sucess: true, data: redeemable });
});

// @desc        Create a redeemable
// @route       POST api/cw-api/redeemables
// @access      Private
exports.createRedeemable = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, description, photo, price } = req.body;

    const redeemable = await Redeemable.create({
        name,
        description,
        photo,
        price
    });

    res.status(200).json({ success: true, data: redeemable });
});
