const express = require('express');
const router = express.Router();
const { getMe, getProfileById, getProfiles, modifyProfile,
    deleteAccount, updateSocial, updateDistinctions,
    updateStatus, doIHaveAProfile } = require('../controllers/profiles');
const { protect, authorize } = require('../middlewares/auth');
const { check } = require('express-validator');


router.route('/hasAProfile').get(protect, doIHaveAProfile);
router.route('/me').get(protect, getMe).post(protect, getMe);
router.route('/user/:userId').get(protect, getProfileById);
router.route('/').get(protect, getProfiles);

router.route('/').post([protect, [
    check('activitySector', 'Activity sector is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
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
]], modifyProfile);

router.route('/').put([protect, [
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
]], modifyProfile);

router.route('/distinctions/:userId').put(protect, authorize('admin'), updateDistinctions);
router.route('/social').put(protect, updateSocial);

router.route('/:userId').delete(protect, deleteAccount);

//Route used by the face recognition web service / can only be used with an admin token
router.route('/status/:userId').put(protect, authorize('admin'), updateStatus)


module.exports = router
