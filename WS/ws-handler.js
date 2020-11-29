const authHandler = require('./controllers/auth');
const helpRHandler = require('./controllers/helpR');
const userHandler = require('./controllers/user');


function WsHandler(wss) {
    this.wss = wss;
    this.routes = {
        auth: new authHandler(wss),
        helpR: new helpRHandler(wss),
        user: new userHandler(wss)
    }
}

WsHandler.prototype.handle = function (msg, socket) {
    const { routes } = this;
    return routes[msg.type][msg.event](msg.payload, socket);
}


module.exports = WsHandler;