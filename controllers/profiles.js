const path = require('path');
const User = require('../models/User');
const Profile = require('../models/Profile');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const { validationResult } = require('express-validator');
const { findOneAndUpdate } = require('../models/User');

//Update of awards must be done implicitely, we shouldn't have a route for modifying it directly
//Unless you are an admin of course.


// @desc        Get current profile
// @route       GET api/cw-api/profiles/me
// @access      Private
exports.getMe = asyncHandler(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.user.id });
    res.status(200).json({ success: true, data: profile });
});

// @desc        Get profile by user ID
// @route       GET api/cw-api/profiles/user/:userId
// @access      Private
exports.getProfileById = asyncHandler(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.params.userId });
    res.status(200).json({ success: true, data: profile })
});

// @desc        Get all profiles
// @route       GET api/cw-api/profiles
// @access      Private
exports.getProfiles = asyncHandler(async (req, res, next) => {
    const profiles = await Profile.find();
    res.status(200).json({ success: true, count: profiles.length, data: profiles })
});

// @desc        Create/update a profile
// @route       POST api/cw-api/profiles
// @route       PUT api/cw-api/profiles
// @access      Private
exports.modifyProfile = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        activitySector,
        company,
        website,
        photo,
        bio,
        skills,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (bio) profileFields.bio = bio;
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    if (activitySector) profileFields.activitySector = activitySector;
    if (photo && !req.user.linkedin) profileFields.photo = photo;

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;

    ///////////////////////////////////////////////////////

    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
        //update
        const newProfile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
        );

        return res.json(newProfile);
    }

    //else create one
    profile = new Profile(profileFields);
    await profile.save();

    //Images :

    //Check if there's a file uploaded
    if (req.files && !req.user.linkedin) {
        const file = req.files.file;

        //Make sure the image is a photo
        if (!file.mimetype.startsWith('image')) {
            return next(new ErrorResponse(`Please upload a photo`, 400));
        }

        //Check file size
        if (file.size > process.env.MAX_FILE_UPLOAD) {
            return next(new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD} MB`, 400));
        }

        //Create custom file name
        file.name = profile._id + path.parse(file.name).ext;

        file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
            if (err) {
                console.err(error);
                return next(new ErrorResponse(`Problem with the uploads`, 500));
            }
            await Profile.findByIdAndUpdate(profile._id, { photo: file.name });
        });
    }

    return res.status(200).json(profile);
});


// @desc        Update profile mood, status or stories
// @route       PUT api/cw-api/profiles/social
// @access      Private
exports.updateSocial = asyncHandler(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
        return next(new ErrorResponse('No profile found', 400));
    }

    const { mood, status, story, comment, award } = req.body;
    let profileFields = {};

    if (mood) profileFields.mood = mood;
    if (status) profileFields.status = status;
    if (story) profileFields.story = story;

    const newProfile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
    );

    return res.status(200).json({ success: true, newProfile });
});


// @desc        Update profile comments, awards
// @route       PUT api/cw-api/profiles/distinctions/:userId
// @access      Private
exports.updateDistinctions = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const profile = await Profile.findOne({ user: req.params.userId });

    if (!profile) {
        return next(new ErrorResponse(`No profile found with the user of id ${userId}`, 400));
    }

    const { comment, award } = req.body;

    if (comment && award) {
        return next(new ErrorResponse("Unable to update comments and awards concurrently", 404));
    }

    let profileFields = {};

    if (comment) {
        if (req.params.id === req.user.id) {
            return next(new ErrorResponse("Forbidden", 403)); //Can't update own comments
        }
        const newComment = {
            author: req.user.id,
            text: comment
        };
        profileFields.comments = [...profile.comments];
        profileFields.comments.unshift(newComment); //To put new comment in the beginning of the array, makes more sense
    }

    if (award) {
        if (req.user.role == 'admin') {
            profileFields.awards = [...profile.awards];
            profileFields.awards.unshift(award);
        } else {
            return next(new ErrorResponse("Forbidden", 403));
        }
    }

    const newProfile = await Profile.findOneAndUpdate(
        { user: req.params.userId },
        { $set: profileFields },
        { new: true }
    );

    return res.status(200).json({ success: true, newProfile });
});


// @desc        Delete account feature
// @route       DELETE api/cw-api/profiles/:userId (optional)
// @access      Private
exports.deleteAccount = asyncHandler(async (req, res, next) => {
    if (req.user.role == 'user') {
        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id });
    }
    if (req.user.role == 'admin') {
        await Profile.findOneAndRemove({ user: req.params.userId });
        await User.findOneAndRemove({ _id: req.params.userId });
    }

    res.status(204).json('User deleted');
});

exports.updateStatus = asyncHandler(async (req, res, next) => {
    console.log(req.body)
    const data = await Profile.findOneAndUpdate({user : req.params.userId}, {status: req.body.status})
    return res.status(200).json({ success: true, data});
});