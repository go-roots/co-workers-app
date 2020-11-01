const express = require('express');
const router = express.Router();
const { getMe, login, register, linkedinAuth } = require('../controllers/auth');
const { protect } = require('../middlewares/auth');


router.route('/login').post(login);
router.route("/register").post(register);
router.route("/linkedinAuth").post(linkedinAuth);
router.route("/me").get(protect, getMe);



module.exports = router