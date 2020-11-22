const Event = require('../models/Event');
const Notification = require('../models/Notification');
const errorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const { validationResult } = require('express-validator');


// @desc        Get all events
// @route       GET api/cw-api/events
// @access      Private
exports.getEvents = asyncHandler(async (req, res, next) => {
    const events = await Event.find();
    res.status(200).json({ success: true, data: events });
});

// @desc        Get single event
// @route       GET api/cw-api/events/:eventId
// @access      Private
exports.getEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.findById(req.params.eventId);

    if (!event) {
        return next(new errorResponse(`No event found with the id of ${req.params.eventId}`));
    }

    res.status(200).json({ success: true, data: event });
});

// @desc        Create an event
// @route       POST api/cw-api/events
// @access      Private
exports.createEvent = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { title, image, description, capacity } = req.body;

    const event = await Event.create({
        title,
        image,
        description,
        capacity
    });

    await Notification.create({
        type: "event",
        title,
        trigger: "5d7a514b5d2c12c7449be042", //admin's user id
        identifier: event._id,
        broadcast: true
    });

    res.status(200).json({ success: true, data: event });
});

// @desc        Add/delete attendant to an event
// @route       PUT api/cw-api/events/:eventId
// @access      Private
exports.attendEvent = asyncHandler(async (req, res, next) => {

    const event = await Event.findById(req.params.eventId);

    if (!event) {
        return next(new errorResponse(`No event found with the id of ${req.params.eventId}`));
    }

    let updatedEvent = event;

    const already = event.attending.some(user => user.user == req.user.id);

    if (!already) {
        updatedEvent.attending.push({ user: req.user.id });
    } else {
        updatedEvent.attending = updatedEvent.attending.filter(attendant => attendant.user != req.user.id);
    }

    const newEvent = await Event.findByIdAndUpdate(
        req.params.eventId,
        { $set: updatedEvent },
        { new: true }
    );

    res.status(200).json({ success: true, data: newEvent });
});