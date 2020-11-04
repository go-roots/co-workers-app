const path = require('path');
const User = require('../models/User');
const Profile = require('../models/Profile');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const { validationResult } = require('express-validator');



// @desc        Get current profile
// @route       GET api/cw-api/profiles/me
// @access      Private
exports.getMe = asyncHandler(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.user.id });
    res.status(200).json({ success: true, data: profile });
});

// @desc        Get single profile
// @route       GET api/cw-api/profiles/:profileId
// @access      Private
exports.getProfile = asyncHandler(async (req, res, next) => {
    const id = req.params.profileId;
    const profile = await Profile.findById(id);
    res.status(200).json({ success: true, data: profile })
});

// @desc        Get all profiles
// @route       GET api/cw-api/profiles
// @access      Private
exports.getProfiles = asyncHandler(async (req, res, next) => {
    const profiles = await Profile.find();
    res.status(200).json({ success: true, count: profiles.length, data: profiles })
});

// @desc        Create or update a profile
// @route       POST api/cw-api/profiles
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

    return res.json(profile);
});


//Update status, mood, stories, comments, awards ?


// @desc        Delete account feature
// @route       DELETE api/cw-api/profiles
// @access      Private
exports.deleteAccount = asyncHandler(async (req, res, next) => {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.status(200).json('User deleted');
});