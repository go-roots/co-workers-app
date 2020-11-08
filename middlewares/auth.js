const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('./async');


//Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        //Set token from Bearer token in header
        token = req.headers.authorization.split(' ')[1];
        //Set token from cookie
    } else {
        return next(new ErrorResponse('No token, not authorized', 400));
    }

    //verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).populate('room');
        next();
    } catch (error) {
        return next(new ErrorResponse('Bad credentials', 401));
    }

});

//Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) { //Reminder, we got req.user from the protect middleware
            return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403));
        }
        next();
    }
}
