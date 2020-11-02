/*Instead of using try/catch is the controllers for error handling,
we can optimize it using this middleware. */

const asyncHandler = function (fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}

module.exports = asyncHandler;
