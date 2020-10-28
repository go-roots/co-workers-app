const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const colors = require('colors');

//load env vars
dotenv.config({ path: './config/config.env' })

//load models
const Event = require('./models/Event');
const HelpRequest = require('./models/HelpRequest');
const Profile = require('./models/Profile');
const Redeemable = require('./models/Redeemable');
const Room = require('./models/Room');
const User = require('./models/User');

//connect to db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

//Read json files
const events = JSON.parse(fs.readFileSync(`${__dirname}/_data/events.json`, 'utf-8'));
const helpRequests = JSON.parse(fs.readFileSync(`${__dirname}/_data/help-requests.json`, 'utf-8'));
const profiles = JSON.parse(fs.readFileSync(`${__dirname}/_data/profiles.json`, 'utf-8'));
const redeemables = JSON.parse(fs.readFileSync(`${__dirname}/_data/redeemables.json`, 'utf-8'));
const rooms = JSON.parse(fs.readFileSync(`${__dirname}/_data/rooms.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));

//Populate or delete data collections
const importD = async () => {
    try {
        await User.create(users);
        await Event.create(events);
        await HelpRequest.create(helpRequests);
        await Profile.create(profiles);
        await Redeemable.create(redeemables);
        await Room.create(rooms);
        console.log('Data imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.log(err)
    }
};

const deleteD = async () => {
    try {
        await User.deleteMany();
        await Event.deleteMany();
        await HelpRequest.deleteMany();
        await Profile.deleteMany();
        await Redeemable.deleteMany();
        await Room.deleteMany();
        console.log('Data deleted...'.red.inverse);
        process.exit();
    } catch (err) {
        console.log(err)
    }
}


if (process.argv[2] === '-i') {
    importD();
} else if (process.argv[2] === '-d') {
    deleteD();
}