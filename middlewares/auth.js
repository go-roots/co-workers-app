const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Protect routes
exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        //Set token from Bearer token in header
        token = req.headers.authorization.split(' ')[1];
        //Set token from cookie
    } else if (req.cookie.token) {
        token = req.cookie.token;
    }
    //Make sure token exists
    if (!token) {
        res.status(401).json({ msg: 'No token, not authorized' });
    }

    //verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id); //Currently logged in user
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Bad credentials' });
    }

};