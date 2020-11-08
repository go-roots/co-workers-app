const express = require('express');
const router = express.Router();

const { getAllRooms, getOneRoom, findUserRoom, updateRoomUser,
    moveUsersInRoom, updateRoom, createRoom, deleteRoom } = require('../controllers/rooms')

const { protect } = require('../middlewares/auth');

//Getters
router.route('/').get(protect, getAllRooms);
router.route('/:roomId').get(protect, getOneRoom);
//Return the room where the User is
router.route('/userWhere/:userId').get(protect, findUserRoom);

//Update
router.route('/:roomId').put(protect, updateRoom);
//Update the users in one room
router.route('/putUsers/:roomId').put(protect, updateRoomUser);

//Create
router.route('/:roomId').post(protect, createRoom);

//Delete
router.route('/:roomId').delete(protect, deleteRoom);

//route used by the face recognition web service
router.route('/moveIn/:roomId').put(protect, moveUsersInRoom)

module.exports = router