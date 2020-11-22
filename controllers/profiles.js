const fetch = require('node-fetch');
const path = require('path');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Notification = require('../models/Notification');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const { validationResult } = require('express-validator');

//Update of awards must be done implicitely, we shouldn't have a route for modifying it directly
//Unless you are an admin of course.


// @desc        Tells if the current user has a profile
// @route       GET api/cw-api/profiles/hasAProfile
// @access      Private
exports.doIHaveAProfile = asyncHandler(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.user.id });
    res.status(200).json({ success: true, hasAProfile: profile ? true : false });
});

// @desc        Get current profile
// @route       GET api/cw-api/profiles/me
// @route       POST api/cw-api/profiles/me
// @access      Private
exports.getMe = asyncHandler(async (req, res, next) => {
    let profile;

    if (req.user.linkedin) {
        const { linkedinToken } = req.body;
        const res = await fetch('https://api.linkedin.com/v2/me?projection=(profilePicture(displayImage~:playableStreams))', {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${linkedinToken}`
            }
        });
        console.log(res);

        const photo = (res.identifiers[0] && res.identifiers[0].identifier) ? res.identifiers[0].identifier : null;

        if (photo) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: { photo } },
                { new: true }
            );

            console.log(profile);
            return res.status(200).json({ success: true, data: profile });
        }
    }

    profile = await Profile.findOne({ user: req.user.id });
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
        position,
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
    if (position) profileFields.position = position;
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
        profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
        );
    } else {
        //else create one
        profile = new Profile(profileFields);
        await profile.save();
    }

    //Images :

    //Check if there's a file uploaded
    if (req.files && !req.user.linkedin) {
        const file = req.files.image;

        //Make sure the image is a photo
        if (!file.mimetype.startsWith('image')) {
            return next(new ErrorResponse(`Please upload a photo`, 400));
        }

        //Check file size
        if (file.size > process.env.MAX_FILE_UPLOAD) {
            return next(new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD} MB`, 400));
        }

        file.name = profile._id + path.parse(file.name).ext;

        file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
            if (err) {
                console.log(err);
                return next(new ErrorResponse(`Problem with the uploads`, 500));
            }
        });

        let photoDbName;

        if (process.env.NODE_ENV === 'production') {
            photoDbName = process.env.DOMAIN + '/img/' + profile._id + path.parse(file.name).ext;
        } else {
            photoDbName = `http://localhost:${process.env.PORT}/img/` + profile._id + path.parse(file.name).ext;
        }

        profile = await Profile.findByIdAndUpdate(
            profile._id,
            { $set: { photo: photoDbName } },
            { new: true }
        );
    }

    res.status(200).json({ data: profile });
});


// @desc        Update profile mood, status or stories
// @route       PUT api/cw-api/profiles/social
// @access      Private
exports.updateSocial = asyncHandler(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
        return next(new ErrorResponse('No profile found', 400));
    }

    const { mood, status, story } = req.body;
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
    const { userId } = req.params
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
        return next(new ErrorResponse(`No profile found with the user of id ${userId}`, 400));
    }

    const { comment, award } = req.body;

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
        { user: userId },
        { $set: profileFields },
        { new: true }
    );

    await Notification.create({
        type: "recommendation-comments",
        title: `${req.user.lastName} ${req.user.firstName} has left a comment on your profile !`,
        receiver: userId,
        trigger: req.user.id
    });

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

//Controller used by the face recognition webService to update the availability of user
exports.updateStatus = asyncHandler(async (req, res, next) => {
    const data = await Profile.findOneAndUpdate(
        { user: req.params.userId },
        { status: req.body.status },
        { new: true }
    );
    return res.status(200).json({ success: true, data });
});