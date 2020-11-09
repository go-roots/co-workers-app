const HelpRequest = require('../models/HelpRequest')
const Notification = require('../models/Notification')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')


let timer;

// @desc        Get (and count) help-requests sent by user
// @route       GET api/cw-api/help-requests/sent/:userId
// @access      Private
exports.getSentHelpReq = asyncHandler(async (req, res, next) => {
    const helpReqs = await HelpRequest.find({ requester: req.params.userId });
    res.status(200).json({ success: true, count: helpReqs.length, data: helpReqs });
});

// @desc        Get help requests received by user
// @route       GET api/cw-api/help-requests/received/:userId
// @access      Private
exports.getReceivedHelpReq = asyncHandler(async (req, res, next) => {
    const helpReqs = await (await HelpRequest.find()).filter(request => request.targetedUsers.includes(req.params.userId));
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
            trigger: req.user.id
        });
    };

    //After a while, expire the HelpRequest
    timer = setTimeout(async () => {
        helpRequest.status = 'expired';
        await helpRequest.save();
    }, 1000 * 60 * 60 * 12); //12 hours

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

    if (helpRequest.requester == req.user.id) {
        return next(new ErrorResponse('Allowed actions: cancel the request', 403));
    }

    if (helpRequest.targetedUsers.includes(req.user.id)) {
        if (req.body.status != 'accepted') {
            return next(new ErrorResponse('Allowed actions: accept the request', 403));
        }
        await Notification.create({
            type: 'help-request',
            text: `${req.user.lastName} has accepted your help request (${req.user.room.name})`,
            receiver: helpRequest.requester,
            trigger: req.user.id
        });
    }

    await HelpRequest.findByIdAndUpdate(
        req.params.reqId,
        { $set: { status: req.body.status } }
    );

    res.sendStatus(204);
});