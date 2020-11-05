const express = require('express');
const router = express.Router();
const { initateTransaction, fulfillTransaction, getTransactions } = require('../controllers/transactions');
const { protect, authorize } = require('../middlewares/auth');


router.route('/').get(protect, authorize('admin'), getTransactions);

router.route('/validate').post(protect, authorize('admin'), fulfillTransaction);
router.route('/').post(protect, authorize('admin'), initateTransaction);


module.exports = router;