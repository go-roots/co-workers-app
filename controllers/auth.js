const User = require('../models/User');
const qs = require('querystring');
const fetch = require('node-fetch');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');
const sendTokenResponse = require('../utils/sendTokenResponse');
const { validationResult } = require('express-validator');


// Controller for managing authorization related routes (login/register/getMe...),
// whether it's social oAuth with linkedin or not


// @desc        Register user
// @route       POST api/cw-api/auth/register
// @access      Public
exports.register = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { firstName, lastName, email, password } = req.body;

    const user = await User.create({
        role: 'user',
        firstName,
        lastName,
        email,
        password
    });

    sendTokenResponse(user, 201, res);
});


// @desc        Login user
// @route       POST api/cw-api/auth/login
// @access      Public
exports.login = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!await user.matchPasswords(password, user.password)) {
        return next(new ErrorResponse('Invalid credentials', 400));
    }

    sendTokenResponse(user, 200, res);
});

// @desc        Linkedin Oauth
// @route       POST api/cw-api/auth/linkedin-oAuth
// @access      Public
exports.linkedinAuth = asyncHandler(async (req, res, next) => {
    const { code } = req.body;

    if (!code) {
        return next(new ErrorResponse('Not authorized to access resource.', 401));
    }

    // Token endpoint
    // Warning: linkedin's client id et secret changes within 2 months
    // We must change the redirect_uri once we got a domain
    const body = {
        grant_type: "authorization_code",
        code,
        redirect_uri: "https://co-workers.herokuapp.com/loading",
        client_id: process.env.LINKEDIN_APP_CLIENT_ID,
        client_secret: process.env.LINKEDIN_APP_CLIENT_SECRET
    }

    const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'post',
        body: qs.stringify(body),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const { access_token: linkedinToken } = await response.json();

    //Get me linkedin profile request

    const profile = await fetch('https://api.linkedin.com/v2/me', {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${linkedinToken}`,
            'cache-control': 'no-cache',
            'X-Restli-Protocol-Version': '2.0.0'
        }
    });

    const profileJson = await profile.json();
    const firstName = Object.values(profileJson.firstName.localized)[0];
    const lastName = Object.values(profileJson.lastName.localized)[0];
    const id = profileJson.id;

    const emailData = await fetch('https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(handle~))', {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${linkedinToken}`
        }
    });

    const emailDataJson = await emailData.json();
    const emailAddress = emailDataJson.elements[0]['handle~']['emailAddress'];

    //Check if the user exists in our db
    let user = await User.findOne({ linkedin: id });

    let status;

    if (user) {
        user = await User.findOne({ linkedin: id });
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = emailAddress;
        await user.save();
        status = 'connect';
        sendTokenResponse(user, 200, res, linkedinToken, status);
    } else {
        user = await User.create({
            linkedin: id,
            firstName,
            lastName,
            email: emailAddress
        });

        status = 'register';
        sendTokenResponse(user, 200, res, linkedinToken, status);
    }
});

// @desc        Get current user
// @route       POST api/cw-api/auth/me
// @access      Private
exports.getMe = asyncHandler((req, res, next) => {
    const user = req.user;

    return res.status(200).json({
        success: true,
        data: user
    });
});

// @desc        User log out / clear cookie
// @route       GET api/cw-api/auth/me
// @access      Private
exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() * 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        data: {}
    });
});
