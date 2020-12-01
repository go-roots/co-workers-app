const Room = require('../models/Room');
const User = require('../models/User');
const Profile = require('../models/Profile');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const commonEmitter = require('../utils/events_common');


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
    const { users } = req.body;

    for (i = 0; i < users.length; i++) {
        let currentUser = users[i].user;
        let room = await Room.findOne({ "users.user": currentUser });
        if (room && (room.name !== req.params.roomName)) {
            //Remove User from his old room
            room.users = room.users.filter(user => user.user != currentUser);
            await room.save()
            //Add User to his new room
            let newRoom = await Room.findOne({ name: req.params.roomName });
            newRoom.users.push({ user: currentUser });
            await newRoom.save()
            //Emit the event to trigger ws
            commonEmitter.emit('userMoved');
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
    let response = {
        success: true,
        rooms: []
    };

    //Prepare the data from db
    const me = await User.findById(req.params.userId);
    const meProfile = await Profile.findOne({ user: req.params.userId });
    const friends = me.friends;
    const rooms = await Room.find();

    //Fetch the user friendlist
    let friendList = []
    for (let i = 0; i < friends.friends.length; i++) {
        friendList.push(toString(friends.friends[i].friend))
    }

    //Variable for the recommendation
    let lenFr = 0;
    let inRoom = [];
    let lessOccupiedRoom = {};
    let lessOccupiedRoomNb = Infinity;
    let mostOccupiedRoom = {};
    let mostOccupiedRoomNb = 0;

    //Loop on all the user in all the rooms to feth infos
    for (let i = 0; i < rooms.length; i++) {
        for (let j = 0; j < rooms[i].users.length; j++) {
            inRoom.push(toString(rooms[i].users[j].user))
        }
        //Handle the most and least occupied room
        if (inRoom.length < lessOccupiedRoomNb) {
            lessOccupiedRoom = rooms[i];
            lessOccupiedRoomNb = inRoom.length;
        }
        if (inRoom.length > mostOccupiedRoomNb) {
            mostOccupiedRoom = rooms[i];
            mostOccupiedRoomNb = inRoom.length;
        }
        //Do the intersection of room user and friendlist
        let friendsIn = friendList.filter(user => inRoom.includes(user))
        if (friendsIn.length > lenFr) {
            response.rooms[0] = rooms[i]
            lenFr = friendsIn.length
        }
        inRoom = []
    }
    switch (meProfile.mood) {
        case "Prefer to stay alone":
            if (!response.rooms.includes(lessOccupiedRoom)) {
                response.rooms.push(lessOccupiedRoom)
            }
            break;
        case "Willing to help others":
            if (!response.rooms.includes(mostOccupiedRoom)) {
                response.rooms.push(mostOccupiedRoom)
            }
            break;
        case "Feeling sociable":
            if (!response.rooms.includes(mostOccupiedRoom)) {
                response.rooms.push(mostOccupiedRoom)
            }
            break;
    }
    res.status(200).json(response);
});