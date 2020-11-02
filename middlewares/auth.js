const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
<<<<<<< HEAD

//Protect routes
exports.protect = async (req, res, next) => {
=======
const asyncHandler = require('./async');


//Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
>>>>>>> 64e53ac196bd3f05354201bed6411319cbef99b4
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
<<<<<<< HEAD
        req.user = await User.findById(decoded.id); //Currently logged in user
=======
        req.user = await User.findById(decoded.id);
>>>>>>> 64e53ac196bd3f05354201bed6411319cbef99b4
        next();
    } catch (error) {
        return next(new ErrorResponse('Bad credentials', 401));
    }

<<<<<<< HEAD
};
=======
});
>>>>>>> 64e53ac196bd3f05354201bed6411319cbef99b4
