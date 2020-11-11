const express = require('express');
const router = express.Router();

const {getRedeemables} = require('../controllers/redeemables');
const { protect } = require('../middlewares/auth');
const { check } = require('express-validator');

//Route to get all redeemable
router.route('/').get(protect, getRedeemables);

module.exports = router