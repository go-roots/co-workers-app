const express = require('express');
const dotenv = require('dotenv');
//morgan: logger middleware
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');

//load env vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

//Initialize express
const app = express();

//body parser middleware
app.use(express.json());

/*Dev logging middleware
To be used only in development mode*/
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

/*Enable cross-origin ressource sharing (default is same origin policy)
But if we want our api to be public, we must enable it.*/
app.use(cors());

/*By default NODE_ENV is set to development
If you don't have two separate scripts for dev and prod, 
we cannot really distinguish devlopment and production
dependencies.*/
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