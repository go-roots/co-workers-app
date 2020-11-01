const User = require('../models/User');
const axios = require('axios');
const qs = require('querystring');
const sendTokenResponse = require('../utils/sendTokenResponse');

// Controller for managing authorization related routes (login/register/getMe...),
// whether it's social oAuth with linkedin or not


// @desc        Register user
// @route       POST /cw-api/auth/register
// @access      Public
exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const user = await User.create({
            role: 'user',
            firstName,
            lastName,
            email,
            password
        });

        sendTokenResponse(user, 201, res)

    } catch (err) {
        return res.status(400).json({ success: false, error: err });
    }
}


// @desc        Login user
// @route       POST /cw-api/auth/login
// @access      Public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(404).json({ success: false, msg: 'Please provide an email and a password' });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !user.password) {
            return res.status(400).json({ success: false, msg: 'Invalid credentials' });
        }

        if (!await user.matchPasswords(password, user.password)) {
            return res.status(400).json({ success: false, msg: 'Invalid credentials' });
        }

        sendTokenResponse(user, 200, res);

    } catch (err) {
        return res.status(400).json({ success: false, error: err });
    }
}

// @desc        Linkedin Oauth
// @route       POST /cw-api/auth/linkedin-oAuth
// @access      Public
exports.linkedinAuth = async (req, res, next) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ success: false, msg: 'Invalid credentials' });
        }

        // Token endpoint
        // Warning: linkedin's client id et secret changes within 2 months
        // We must change the redirect_uri once we got a domain
        const body = {
            grant_type: "authorization_code",
            code: code,
            redirect_uri: "https%3A%2F%2Fshy-surf-2412.bss.design%2Fdashboard.html",
            client_id: process.env.LINKEDIN_APP_CLIENT_ID,
            client_secret: process.env.LINKEDIN_APP_CLIENT_SECRET
        }

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        const { access_token: linkedinToken } = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', qs.stringify(body), config);

        //Get me linkedin profile request
        let options = {
            headers: {
                'Authorization': `Bearer ${linkedinToken}`,
                'cache-control': 'no-cache',
                'X-Restli-Protocol-Version': '2.0.0'
            }
        }
        const resData = await axios.get('https://api.linkedin.com/v2/me', options);
        const { id, firstName, lastName } = resData;

        options = {
            headers: {
                'Authorization': `Bearer ${linkedinToken}`,
                "q": "members",
                "projection": "(elements*(handle~))"
            }
        }
        const emailData = await axios.get('https://api.linkedin.com/v2/clientAwareMemberHandles', options).elements[0]['handle~'];
        const emailAddress = emailData.emailAddress ? emailData.emailAddress : null;

        //Check if the user exists in our db
        let user = await User.findById(id);

        if (user) {
            user = User.findByIdAndUpdate(id, {
                firstName,
                lastName,
                email: emailAddress
            })
            sendTokenResponse(user, 200, res, linkedinToken);
        } else {
            user = await User.create({
                _id: id,
                firstName,
                lastName,
                email: emailAddress
            });

            sendTokenResponse(user, 200, res, linkedinToken);
        }

    } catch (err) {
        return res.status(400).json({ success: false });
    }
}

// @desc        Get current user
// @route       POST /cw-api/auth/me
// @access      Private
exports.getMe = (req, res, next) => {
    const user = req.user;
    try {
        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        return res.status(400).json({ success: false });
    }
}