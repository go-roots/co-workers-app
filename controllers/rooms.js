const Room = require('../models/Room');
const User = require('../models/User');
const Profile = require('../models/Profile');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const { response } = require('express');


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
        { "users.user": req.params.userId }
    );
    res.status(200).json({ success: true, data: room })
});

exports.updateRoomUser = asyncHandler(async (req, res, next) => {
    roomId = req.params.roomId;
    const { users } = req.body;
    const room = await Room.findOneAndUpdate({ name: roomId }, { users: users });
    res.status(200).json({ success: true, data: room });
});

exports.moveUsersInRoom = asyncHandler(async (req, res, next) => {
    const bod = req.body
    const users = bod.users

    for (i = 0; i < users.length; i++) {
        var room = await Room.findOne({ "users.user": users[i].user });
        if (room.name !== req.params.roomId) {
            //Remove User from his old room
            room.users = room.users.filter(user => user.user != users[i].user);
            await room.save()
            //Add User to his new room
            var newRoom = await Room.findOne({ name: req.params.roomId });
            newRoom.users.push({ user: users[i].user });
            await newRoom.save()
        }
    }
    res.status(200).json({ success: true });
});

exports.updateRoom = asyncHandler(async (req, res, next) => {
    const room = await Room.findOneAndUpdate({ name: roomId }, req.body);
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

exports.getRecomendedRooms = asyncHandler(async (req, res, next) => {
    //Setup the answer
    var response = {success : true,
                rooms : []
            };
    
    //Prepare the data from db
    const me = await User.findById(req.params.userId);
    const meProfile = await Profile.findOne({user: req.params.userId});
    const friends = me.friends;
    const rooms = await Room.find();

    //Fetch the user friendlist
    var friendList = []
    for (let i = 0; i < friends.friends.length; i++) {
        friendList.push(toString(friends.friends[i].friend))
    }

    //Variable for the recommendation
    var lenFr = 0;
    var inRoom = [];
    var lessOccupiedRoom = {};
    var lessOccupiedRoomNb = Infinity;
    var mostOccupiedRoom = {};
    var mostOccupiedRoomNb = 0;

    //Loop on all the user in all the rooms to feth infos
    for (let i = 0; i < rooms.length; i++) {
        for (let j = 0; j < rooms[i].users.length; j++) {
            inRoom.push(toString(rooms[i].users[j].user))
        }
        //Handle the most and least occupied room
        if(inRoom.length < lessOccupiedRoomNb){
            lessOccupiedRoom = rooms[i];
            lessOccupiedRoomNb = inRoom.length;
        }
        if(inRoom.length > mostOccupiedRoomNb){
            mostOccupiedRoom = rooms[i];
            mostOccupiedRoomNb = inRoom.length;
        }
        //Do the intersection of room user and friendlist
        var friendsIn = friendList.filter(user => inRoom.includes(user))
        if (friendsIn.length > lenFr){
            response.rooms[0] = rooms[i]
        lenFr = friendsIn.length
        }
        inRoom = []
    }
    switch (meProfile.mood){
        case "Prefer to stay alone":
            response.rooms.push(lessOccupiedRoom)
            break;
        case "Willing to help others":
            response.rooms.push(mostOccupiedRoom)
            break;
        case "Feeling sociable":
            response.rooms.push(mostOccupiedRoom)
            break;
    }
    res.status(200).json(response);
});