const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const path = require('path');
const errorHandler = require('./middlewares/error');
const cors = require('cors');
const fileupload = require('express-fileupload');
const connectDB = require('./config/db');

//load env vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

//import routes
const auth = require('./routes/auth');
const profiles = require('./routes/profiles');
const users = require('./routes/users');
const transactions = require('./routes/transactions');
const rooms = require('./routes/rooms');
const helpRequests = require('./routes/help-requests');
const notifications = require('./routes/notifications');
const redeemables = require('./routes/redeemables');
const events = require('./routes/events');

//Initialize express + socket server
const WebSocket = require('ws');
const WsHandler = require('./WS/ws-handler');
const app = express();
const server = http.createServer(app);

//Hybrid system (both http + ws api)
//Workflow : the CLIENT do his http req, db is updated.
//Then the CLIENT sends an event through the ws protocol
const wss = new WebSocket.Server({ server: server });
const wsHandler = new WsHandler(wss);

wss.on('connection', (socket, req) => {
    socket.on('message', message => {
        const msg = JSON.parse(message);
        wsHandler.handle(msg, socket);
    });

    socket.on('error', err => {
        console.log(err.message.red.bold);
    });

    socket.on('close', () => {
        console.log('Connection closed'.red.bold);
        socket.terminate();
    });
});

//body parser middleware
app.use(express.json());

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
app.use('/api/cw-api/events', events);

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