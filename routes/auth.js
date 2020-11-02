const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { getMe, login, register, linkedinAuth } = require('../controllers/auth');
=======
const { getMe, login, register, linkedinAuth, logout } = require('../controllers/auth');
>>>>>>> 64e53ac196bd3f05354201bed6411319cbef99b4
const { protect } = require('../middlewares/auth');


router.route('/login').post(login);
router.route("/register").post(register);
router.route("/linkedinAuth").post(linkedinAuth);
router.route("/me").get(protect, getMe);
<<<<<<< HEAD
=======
router.route("/logout").get(protect, logout);
>>>>>>> 64e53ac196bd3f05354201bed6411319cbef99b4



module.exports = router