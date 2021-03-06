const express = require('express');
const router = express.Router();

const { getRedeemables, getRedeemable, createRedeemable } = require('../controllers/redeemables');
const { protect, authorize } = require('../middlewares/auth');
const { check } = require('express-validator');


router.route('/').get(protect, getRedeemables).post([protect, authorize('admin'), [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('photo', 'Supported formats for images are jpeg, jpg, png, gif').custom((value, { req }) => {
        if (req.body.photo) {
            let extension = req.body.photo.split('.').pop();
            switch (extension) {
                case 'jpg':
                    return true;
                case 'jpeg':
                    return true;
                case 'png':
                    return true;
                case 'gif':
                    return true;
                default:
                    return false;
            }
        } else {
            return true;
        }
    })
]], createRedeemable);
router.route('/:redeemableId').get(protect, getRedeemable);


module.exports = router