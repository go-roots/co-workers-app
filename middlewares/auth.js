const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

//Protect routes
exports.protect = async (req, res, next) => {
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
        req.user = await User.findById(decoded.id); //Currently logged in user
        next();
    } catch (error) {
        return next(new ErrorResponse('Bad credentials', 401));
    }

};