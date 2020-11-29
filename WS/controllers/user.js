const WebSocket = require('ws');

function user(wss) {
    this.wss = wss
}

user.prototype.friendR = function (payload, socket) {
    const { userToUpdate } = payload;
    this.wss.clients.forEach(client => {
        if (client.userId == userToUpdate && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: 'user',
                event: 'reloadUser'
            }));
            client.send(JSON.stringify({
                type: 'notifications'
            }));
        }
    });
};

user.prototype.sendMessage = function (payload, socket) {
    const { userToUpdate } = payload;
    this.wss.clients.forEach(client => {
        if (client.userId == userToUpdate && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: 'user',
                event: 'reloadUser'
            }));
        }
    });
};


module.exports = user;