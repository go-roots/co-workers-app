const authHandler = require('./controllers/auth');


function WsHandler(wss) {
    this.wss = wss;
    this.routes = {
        auth: new authHandler(wss)
    }
}

WsHandler.prototype.handle = function (msg, socket) {
    const { routes } = this;
    return routes[msg.type][msg.event](msg.payload, socket);
}


module.exports = WsHandler;