const sendTokenResponse = (user, statusCode, res, linkedinToken = null, status = null) => {
    const token = user.getSignedJwtToken();

    // const options = {
    //     expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    //     httpOnly: true
    // };

    // if (process.env.NODE_ENV === 'production') {
    //     options.secure = true;
    // }

    res.status(statusCode).json({ success: true, token, linkedinToken, status })
    // .cookie('token', token, options)

};


module.exports = sendTokenResponse;