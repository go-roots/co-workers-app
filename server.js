const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const jwt = require('jsonwebtoken');
const path = require('path');
const errorHandler = require('./middlewares/error');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const connectDB = require('./config/db');

//load env vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

//import routes
const Room = require('./models/Room');
const Redeemable = require('./models/Redeemable'); //This is just for populating transactions
const auth = require('./routes/auth');
const profiles = require('./routes/profiles');
const users = require('./routes/users');
const transactions = require('./routes/transactions');
const rooms = require('./routes/rooms');
const helpRequests = require('./routes/help-requests');
const notifications = require('./routes/notifications');
const redeemables = require('./routes/redeemables')

//Initialize express + socket server
const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server: server });

wss.on('connection', socket => {

    socket.on('message', message => {

        const msg = JSON.parse(message);

        if (msg.event === 'authorization') {
            if (!msg.token) {
                socket.terminate();
            }

            try {
                jwt.verify(token, process.env.JWT_SECRET);
            } catch (error) {
                socket.terminate();
            }
            console.log('authenticated and connected');
        }
    });

    setInterval(async () => {
        const rooms = await Room.find();
        socket.send(JSON.stringify({ event: 'rooms', payload: rooms }));
    }, 2000);
});

//body parser middleware
app.use(express.json());

//cookie parser
app.use(cookieParser());

// Dev logger middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

//File uploading
app.use(fileupload());

// Enable cross-origin ressource sharing (default is same origin policy) 
app.use(cors());

//Mount routers
app.use('/api/cw-api/auth', auth);
app.use('/api/cw-api/profiles', profiles);
app.use('/api/cw-api/users', users);
app.use('/api/cw-api/transactions', transactions);
app.use('/api/cw-api/rooms', rooms);
app.use('/api/cw-api/help-requests', helpRequests);
app.use('/api/cw-api/notifications', notifications);
app.use('/api/cw-api/redeemables', redeemables);

//Error handling middleware
app.use(errorHandler);

//Set static folder (accessible in the url through localhost:port/img...)
app.use(express.static(path.join(__dirname, 'public')));

//Serve static assets in production (client)
if (process.env.NODE_ENV === 'production') {
    //set static folders
    app.use(express.static('client/user/build'));
    app.use(express.static('client/admin/build'));
    //Serve index.html build files
    app.get('/admin', (req, res) => res.sendFile(path.resolve(__dirname, 'client/admin', 'build', 'index.html')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client/user', 'build', 'index.html')))
}

// By default NODE_ENV is set to development
const PORT = process.env.PORT || 5000;
server.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

/*Handle unhandled promise rejection
This is typically in case we cannot 
connect to MongoDB whathever the reason*/
process.on('unhandledRejection', (err, promise) => {
    console.log(`error: ${err.message}`.red);
    //close server & exit process
    server.close(() => process.exit(1));
});