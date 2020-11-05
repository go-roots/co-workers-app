const express = require('express');
const router = express.Router();
const { getMe, login, register, linkedinAuth, logout } = require('../controllers/auth');
const { protect } = require('../middlewares/auth');
const { check } = require('express-validator');


router.route('/login').post([
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
], login);
router.route("/register").post([
    check('firstName', 'FirstName is required').not().isEmpty(),
    check('lastName', 'LastName is required').not().isEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
], register);
router.route("/linkedinAuth").post(linkedinAuth);
router.route("/me").get(protect, getMe);
router.route("/logout").get(protect, logout);



module.exports = router