const jwt = require('jsonwebtoken');

function authHandler(wss) {
    this.wss = wss;
};

authHandler.prototype.authorize = function (payload, socket) {
    if (!payload.token) {
        console.log('wss: no token'.red.bold);
        return socket.terminate();
    }

    try {
        //Authenticate the user and assign its user.id to the socket
        const token = payload.token.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        this.wss.clients.forEach(client => { if (client == socket) client.userId = decoded.id })
    } catch (error) {
        console.log('wss: authentication failed'.red.bold);
        return socket.terminate();
    }

    console.log('wss: authenticated and connected'.blue.bold);
};


module.exports = authHandler;