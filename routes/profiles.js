const path = require('path');
const express = require('express');
const router = express.Router();
const { getMe, getProfile, getProfiles, modifyProfile, deleteAccount } = require('../controllers/profiles');
const { protect } = require('../middlewares/auth');
const { check } = require('express-validator');


router.route('/me').get(protect, getMe);
router.route('/:profileId').get(protect, getProfile);
router.route('/').post([protect, [
    check('activitySector', 'Activity sector is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('photo', 'Supported formats for images are jpeg, jpg, png, gif').custom((value, { req }) => {
        if (req.body.photo !== undefined) {
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
]], modifyProfile);
router.route('/').get(protect, getProfiles);
router.route('/').delete(protect, deleteAccount);



module.exports = router