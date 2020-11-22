const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const { getEvents, getEvent, createEvent, attendEvent } = require('../controllers/events');
const { check } = require('express-validator');


router.route('/').get(protect, getEvents).post([protect, authorize('admin'), [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('capacity', 'Capacity is required').not().isEmpty(),
    check('image', 'Supported formats for images are jpeg, jpg, png, gif').custom((value, { req }) => {
        if (req.body.image) {
            let extension = req.body.image.split('.').pop();
            switch (extension) {
                case 'jpg':
                    return true;
                case 'jpeg':
                    return true;
                case 'png':
                    return true;
                case 'gif':
                    return true;
                default:
                    return false;
            }
        } else {
            return true;
        }
    })
]], createEvent);
router.route('/:eventId').get(protect, getEvent).put(protect, attendEvent);


module.exports = router;