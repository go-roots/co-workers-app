const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

//load env vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

//import routes
const auth = require('./routes/auth');

//Initialize express
const app = express();

//body parser middleware
app.use(express.json());

//cookie parser
app.use(cookieParser());

// Dev logger middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

// Enable cross-origin ressource sharing (default is same origin policy) 
app.use(cors());

//Mount routers
app.use('/api/cw-api/auth', auth);

// By default NODE_ENV is set to development
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

/*Handle unhandled promise rejection
This is typically in case we cannot 
connect to MongoDB whathever the reason*/
process.on('unhandledRejection', (err, promise) => {
    console.log(`error: ${err.message}`.red);
    //close server & exit process
    server.close(() => process.exit(1));
})