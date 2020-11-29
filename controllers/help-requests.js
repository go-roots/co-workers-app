const HelpRequest = require('../models/HelpRequest')
const Notification = require('../models/Notification')
const Room = require('../models/Room');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')


let timer;

// @desc        Get (and count) help-requests sent by user
// @route       GET api/cw-api/help-requests/sent/:userId/:status
// @access      Private
exports.getSentHelpReq = asyncHandler(async (req, res, next) => {
    const { status, userId } = req.params;
    const query = status
        ? { status, requester: { $in: userId } }
        : { requester: { $in: userId } };

    const helpReqs = await HelpRequest.find(query).select('-targetedUsers');

    res.status(200).json({ success: true, count: helpReqs.length, data: helpReqs });
});

// @desc        Get help requests received by user
// @route       GET api/cw-api/help-requests/received/:userId/:status
// @access      Private
exports.getReceivedHelpReq = asyncHandler(async (req, res, next) => {
    const { status, userId } = req.params;
    const query = status
        ? { status, targetedUsers: { $in: userId } }
        : { targetedUsers: { $in: userId } };

    const helpReqs = await HelpRequest.find(query).select('-targetedUsers');

    res.status(200).json({ success: true, count: helpReqs.length, data: helpReqs });
});


// @desc        Get help-requests for admin (filter by state)
// @route       GET api/cw-api/help-requests/:status
// @access      Private + restricted
exports.getHelpReq = asyncHandler(async (req, res, next) => {
    const query = req.params.status
        ? { status: req.params.status }
        : null;

    const helpReqs = await HelpRequest.find(query);

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
            title: `${req.user.firstName} ${req.user.lastName} sent you a help request !`,
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


    res.status(200).send({ success: true, data: helpRequest });
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

    if (helpRequest.targetedUsers.find(user => user == req.user.id)) {
        if (req.body.status != 'accepted') {
            return next(new ErrorResponse('Allowed actions: accept the request', 403));
        }

        const room = Room.find({ users: { $in: { user: req.user.id } } });

        await Notification.create({
            type: 'accept-help-request',
            text: `${req.user.lastName} ${req.user.firstName} has accepted your help request (${room.name})`,
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

    const newHelpR = await HelpRequest.findByIdAndUpdate(
        req.params.reqId,
        { $set: { status: req.body.status } },
        { new: true }
    );

    res.status(200).send({ success: true, data: newHelpR });
});