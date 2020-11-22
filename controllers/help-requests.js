const HelpRequest = require('../models/HelpRequest')
const Notification = require('../models/Notification')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')


let timer;

// @desc        Get (and count) help-requests sent by user
// @route       GET api/cw-api/help-requests/sent/:userId/:status
// @access      Private
exports.getSentHelpReq = asyncHandler(async (req, res, next) => {
    const { status, userId } = req.params;
    let helpReqs;

    if (status) {
        helpReqs = await HelpRequest.find({ requester: userId, status })
    } else {
        helpReqs = await HelpRequest.find({ requester: userId })
    }

    res.status(200).json({ success: true, count: helpReqs.length, data: helpReqs });
});

// @desc        Get help requests received by user
// @route       GET api/cw-api/help-requests/received/:userId/:status
// @access      Private
exports.getReceivedHelpReq = asyncHandler(async (req, res, next) => {
    const { status, userId } = req.params;
    let helpReqs;

    if (status) {
        helpReqs = await HelpRequest.find({ status }).filter(request => request.targetedUsers.includes(userId));
    } else {
        helpReqs = await HelpRequest.find();
        helpReqs.filter(request => request.targetedUsers.includes(userId));
    }

    res.status(200).json({ success: true, count: helpReqs.length, data: helpReqs });
});


// @desc        Count help-requests (filter by state)
// @route       GET api/cw-api/help-requests/:status
// @access      Private + restricted
exports.countHelpReq = asyncHandler(async (req, res, next) => {
    let helpReqs;

    if (req.params.status != 'empty') {
        helpReqs = await HelpRequest.find({ status: req.params.status });
    } else {
        helpReqs = await HelpRequest.find();
    }

    res.status(200).json({ success: true, count: helpReqs.length, data: helpReqs });
});

// @desc        Create a help request (then immediately after create notifs to all people concerned)
// @route       POST api/cw-api/help-requests
// @access      Private + restricted
exports.createHelpReq = asyncHandler(async (req, res, next) => {
    const { users, question } = req.body;

    //Create the help-request
    const helpRequest = await HelpRequest.create({
        requester: req.user.id,
        targetedUsers: users,
        status: 'ongoing',
        question
    });

    //Send a notification to concerned users
    for (const user of users) {
        await Notification.create({
            type: 'help-request',
            text: `${req.user.lastName} sent you a help request !`,
            receiver: user,
            trigger: req.user.id,
            identifier: helpRequest._id
        });
    };

    //After a while, expire the HelpRequest
    timer = setTimeout(async () => {
        helpRequest.status = 'expired';
        await helpRequest.save();
    }, 1000 * 60 * 60 * 3); //3 hours

    res.sendStatus(204);

});

// @desc        Update help-request status
// @route       PUT api/cw-api/help-requests/:reqId
// @access      Private
exports.updateHelpReq = asyncHandler(async (req, res, next) => {

    const helpRequest = await HelpRequest.findById(req.params.reqId);

    if (!helpRequest) {
        return next(new ErrorResponse(`No request found with the id ${req.params.reqId}`, 404));
    }

    if (helpRequest.status != 'ongoing') {
        return next(new ErrorResponse('Request has been cancelled, expired or already accepted', 403));
    }

    if (!(req.body.status != 'cancelled' || req.body.status != 'accepted')) {
        return next(new ErrorResponse('Allowed actions: accept and cancel the request', 403));
    }

    if (helpRequest.requester == req.user.id && req.body.status != 'cancelled') {
        return next(new ErrorResponse('Allowed actions: cancel the request', 403));
    }

    if (helpRequest.targetedUsers.includes(req.user.id)) {
        if (req.body.status != 'accepted') {
            return next(new ErrorResponse('Allowed actions: accept the request', 403));
        }
        await Notification.create({
            type: 'accept-help-request',
            text: `${req.user.lastName} ${req.user.firstName} has accepted your help request (${req.user.room.name})`,
            receiver: helpRequest.requester,
            trigger: req.user.id,
            identifier: helpRequest._id
        });
        setTimeout(async () => {
            await Notification.create({
                type: "post-help-request",
                title: "You asked Derek for help. Feel free to leave a comment on his/her profile !",
                receiver: helpRequest.requester,
                trigger: req.user.id,
                identifier: helpRequest._id
            });
        }, 1000 * 60 * 30); //30min
    }

    await HelpRequest.findByIdAndUpdate(
        req.params.reqId,
        { $set: { status: req.body.status } }
    );

    await Notification.deleteMany({ identifier: helpRequest._id });

    res.sendStatus(204);
});