const User = require('../models/User');
const Notification = require('../models/Notification');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const { validationResult } = require('express-validator');


// Some fields are not updated at all (password, linkedin, role)


// @desc        Get single/all user(s) light/extended version
// @route       GET api/cw-api/users/light/:userId
// @route       GET api/cw-api/users/extended/:userId
// @route       GET api/cw-api/users/light
// @route       GET api/cw-api/users/extended
// @access      Private
exports.getFilteredUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc        Updated only by the admin (rfid, billing)
// @route       PUT api/cw-api/users/admin/:userId
// @access      Private
exports.registerRfidOrBilling = asyncHandler(async (req, res, next) => {
    const { rfid, bill, contractType } = req.body;
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
        return next(new ErrorResponse(`No user found with the id${userId}`, 404));
    }

    if (!(rfid || bill || contractType)) {
        return next(new ErrorResponse('Please specify a field to modify', 404));
    }

    let updatedUser = user;

    if (rfid) updatedUser.rfid = rfid;
    if (bill) updatedUser.billing.bill.unshift(bill);
    if (contractType) updatedUser.billing.contractType = contractType;

    const newUser = await User.findByIdAndUpdate(
        userId,
        { $set: updatedUser },
        { new: true }
    );

    res.status(200).json({ success: true, data: newUser });
});

// @desc        Updated only by a user that doesn't connect with linkedin (email, fName, lName)
// @route       PUT api/cw-api/users/nolinkedin
// @access      Private
exports.updateForNolinkedinUser = asyncHandler(async (req, res, next) => {
    if (req.user.linkedin) {
        return next(new ErrorResponse('Forbidden', 403));
    }

    const { email, firstName, lastName } = req.body;
    let updatedUser = {};

    if (email) updatedUser.email = email;
    if (firstName) updatedUser.firstName = firstName;
    if (lastName) updatedUser.lastName = lastName;

    const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: updatedUser },
        { new: true }
    );

    res.status(200).json({ success: true, data: user });
});

// Some fields must be updated by the user or the admin (friends, messages, stats, electricityConsumptionLogs)
// stats, electricityConsumptionLogs is ignored for now

// @desc        Send a message
// @route       POST api/cw-api/users/message/:userId
// @access      Private
exports.sendMessage = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { userId } = req.params;

    if (req.user.id == userId) {
        return next(new ErrorResponse('Forbidden', 403));
    }

    const user = await User.findById(userId);

    if (!user) {
        return next(new ErrorResponse(`User not found with the id ${userId}`, 404));
    }

    const newMessage = {
        from: req.user.id,
        text: req.body.message,
        firstName: req.user.firstName,
        lastName: req.user.lastName
    };

    user.messages.unshift(newMessage);
    await user.save();

    res.sendStatus(204);
});

// @desc        deletes a message
// @route       DELETE api/cw-api/users/message/:msgId
// @access      Private
exports.deleteMessage = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const messages = user.messages.filter(msg => msg._id != req.params.msgId);

    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { $set: { messages } },
        { new: true }
    );

    res.status(200).json({ success: true, data: updatedUser });
});

// @desc        'See' a message
// @route       UPDATE api/cw-api/users/message/:msgId
// @access      Private
exports.updateSeeMessage = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const messages = user.messages.map(msg => {
        if (msg._id == req.params.msgId) {
            msg.seen = true
        }
        return msg;
    });

    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { $set: { messages } },
        { new: true }
    );

    res.status(200).json({ success: true, data: updatedUser });
});

// @desc        Add friend request
// @route       PUT api/cw-api/users/friendReq/:userId
// @access      Private
exports.addFriendReq = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;

    if (req.user.id == userId) {
        return next(new ErrorResponse('Forbidden', 403));
    }

    let user = await User.findById(userId);

    if (!user) {
        return next(new ErrorResponse(`User not found with the id ${userId}`, 404));
    }

    for (const fRequest of user.friends.friendRequests) {
        if (fRequest.user == req.user.id) {
            return next(new ErrorResponse(`A friend request is already registered for the user with id ${userId}`, 403));
        }
    }

    for (const friend of user.friends.friends) {
        if (friend.friend == req.user.id) {
            return next(new ErrorResponse(`The user with the ${userId} is already your friend`, 403));
        }
    }

    const newFriendRequest = {
        user: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName
    };

    user.friends.friendRequests.unshift(newFriendRequest);

    await user.save();
    await Notification.create({
        type: "friend-request",
        title: `${req.user.lastName} ${req.user.firstName} wants to be your friend !`,
        receiver: userId,
        trigger: req.user.id
    });

    user = await User.findById(userId).populate('profile');
    res.status(200).json({ success: true, data: user });
});

// @desc        Delete friend request
// @route       DELETE api/cw-api/users/friendReq/:userId
// @access      Private
exports.deleteFriendReq = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;

    if (req.user.id == userId) {
        return next(new ErrorResponse('Forbidden', 403));
    }

    let user = await User.findById(userId);

    if (!user) {
        return next(new ErrorResponse(`User not found with the id ${userId}`, 404));
    }

    let updatedUser = user;

    updatedUser.friends.friendRequests = updatedUser.friends.friendRequests.filter(fReq => fReq.user != req.user.id)

    user = await User.findByIdAndUpdate(userId, updatedUser, { new: true }).populate('profile');

    await Notification.findOneAndRemove({
        receiver: userId,
        trigger: req.user.id
    });

    res.status(200).json({ success: true, data: user });
});

// @desc        Accept/refuse friend request
// @route       PUT api/cw-api/users/friendReq/res/:userId
// @access      Private
exports.acceptFriendReq = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const { action } = req.body;

    const friend = await User.findById(userId);

    if (!friend) {
        return next(new ErrorResponse(`No friends request found for the user with id ${userId}`, 404));
    }

    //Update me
    let updatedMe = req.user;

    //Find the friend request
    const friendRequest = updatedMe.friends.friendRequests.find(fRequest => fRequest.user == userId);

    //Delete the friend request
    updatedMe.friends.friendRequests = updatedMe.friends.friendRequests.filter(fRequest => fRequest.user != userId);

    if (action === 'accept') {
        //Transform the request into friendship
        let newFriend = {
            friend: friendRequest.user,
            firstName: friendRequest.firstName,
            lastName: friendRequest.lastName
        };

        updatedMe.friends.friends.unshift(newFriend);

        //Update the friend
        newFriend = {
            friend: req.user.id,
            firstName: req.user.firstName,
            lastName: req.user.lastName
        };

        friend.friends.friends.unshift(newFriend);

        await friend.save();
    }

    const newMe = await User.findByIdAndUpdate(
        req.user.id,
        { $set: updatedMe },
        { new: true }
    );

    await Notification.findOneAndRemove({
        receiver: req.user.id,
        trigger: userId
    });

    res.status(200).json({ success: true, data: newMe });
});

// @desc        Delete friend
// @route       DELETE api/cw-api/users/friend/:userId
// @access      Private
exports.deleteFriend = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;

    if (req.user.id == userId) {
        return next(new ErrorResponse('Forbidden', 403));
    }

    let updatedFriend = await User.findById(userId);

    if (!updatedFriend) {
        return next(new ErrorResponse(`User not found with the id ${userId}`, 404));
    }

    updatedFriend.friends.friends = updatedFriend.friends.friends.filter(f => f.friend != req.user.id);
    await updatedFriend.save();

    let currentUser = await User.findById(req.user.id);
    currentUser.friends.friends = currentUser.friends.friends.filter(f => f.friend != userId);
    await currentUser.save();

    user = await User.findById(req.user.id).populate('profile');

    res.status(200).json({ success: true, data: user });
});