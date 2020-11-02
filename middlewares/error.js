const ErrorResponse = require('../utils/errorResponse');

/*Middleware for error handling, basically we need it to return a json error
Indeed, the default error handling tool in express render html*/

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

<<<<<<< HEAD
    //Typically here, if the error is not CastError, we gonna have the default err message
    error.message = err.message;

    //log to console for dev
    console.log(err);
    console.log(err.name);
=======
    error.message = err.message;

    console.log(err.message);
>>>>>>> 64e53ac196bd3f05354201bed6411319cbef99b4

    //Mongoose bad ObjectId
    if (err.name == 'CastError') {
        error = new ErrorResponse(`Resource not found with id ${err.value}`, 404);
    }

    //Mongoose duplicate key (name)
    if (err.code == 11000) {
        error = new ErrorResponse('Duplicate field value entered', 400);
    }

    //Mongoose validation error
    if (err.name == 'ValidationError') {
        //Object.values(err.errors) is used to extract an array of errors from err object
        error = new ErrorResponse(Object.values(err.errors).map(val => val.message), 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server error'
    });
};

module.exports = errorHandler;