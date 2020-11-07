const Room = require('../models/Room');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const { validationResult } = require('express-validator');

exports.getAllRooms = asyncHandler(async (req, res, next) => {
    const rooms = await Room.find();
    res.status(200).json({ success: true, data: rooms });
});

exports.getOneRoom = asyncHandler(async (req, res, next) => {
    const room = await Room.findOne({ name: req.params.roomId });
    res.status(200).json({ success: true, data: room })
});

exports.findUserRoom = asyncHandler(async (req, res, next) => {
    const room = await Room.find(
        {"users.user" : req.params.userId}
        );
    res.status(200).json({ success: true, data: room })
});

exports.updateRoomUser = asyncHandler(async (req, res, next) => {
    roomId = req.params.roomId;
    const {users} = req.body;
    const room = await Room.findOneAndUpdate({name: roomId}, {users: users});
    res.status(200).json({ success: true, data: room });
});

exports.moveUsersInRoom = asyncHandler(async (req, res, next) => {
    const bod = req.body
    const users = bod.users
    
    for(i = 0; i< users.length; i++){
        var room = await Room.findOne({"users.user" : users[i].user});
        if(room.name !== req.params.roomId){
            //Remove User from his old room
            room.users = room.users.filter(user => user.user != users[i].user);
            await room.save()
            //Add User to his new room
            var newRoom = await Room.findOne({name: req.params.roomId});
            newRoom.users.push({user: users[i].user});
            await newRoom.save()
        }
    }
    res.status(200).json({ success: true});
});

exports.updateRoom = asyncHandler(async (req, res, next) => {
    const room = await Room.findOneAndUpdate({name: roomId}, req.body);
    res.status(200).json({ success: true, data: room });
});

exports.createRoom = asyncHandler(async (req, res, next) => {
    const rm = new Room(req.body)
    const room = await Room.save(rm);
    res.status(200).json({ success: true, data: rm });
});

exports.deleteRoom = asyncHandler(async (req, res, next) => {
    const remove = await Room.findByIdAndDelete(req.params.roomId)
    res.status(200).json({ success: true, data: remove });
});