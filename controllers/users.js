const path = require('path');
const User = require('../models/User');
const Profile = require('../models/Profile');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const { validationResult } = require('express-validator');



// @desc        Get single user
// @route       GET api/cw-api/users/:userId
// @access      Private
exports.getUser = asyncHandler(async (req, res, next) => {
    const id = req.params.userId;
    const user = await User.findById(id);
    res.status(200).json({ success: true, data: user })
});

// @desc        Get all profiles
// @route       GET api/cw-api/users
// @access      Private
exports.getUsers = asyncHandler(async (req, res, next) => {

    const queryStr = { ...req.query };
    const users = await User.find(queryStr).populate('room').populate('profile');

    res.status(200).json({ success: true, count: users.length, data: users })
});


// @desc        Delete account admin feature
// @route       DELETE api/cw-api/users/:userId
// @access      Private
exports.deleteAccountAdmin = asyncHandler(async (req, res, next) => {
    await Profile.findOneAndRemove({ user: req.params.userId });
    await User.findOneAndRemove({ _id: req.params.userId });
    res.status(200).json('User deleted');
});