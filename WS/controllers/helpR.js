const WebSocket = require('ws');

function helpR(wss) {
    this.wss = wss
}

helpR.prototype.sendHelpR = function (payload, socket) {
    this.wss.clients.forEach(client => {
        const { users } = payload;
        users.forEach(user => {
            if (client.userId == user && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    type: 'helpR',
                    event: 'getHelpR'
                }));
                client.send(JSON.stringify({
                    type: 'notifications'
                }));
            }
        });
    });
}

helpR.prototype.acceptHelpR = function (payload, socket) {
    const { userToUpdate } = payload;
    this.wss.clients.forEach(client => {
        if (client.userId == userToUpdate && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: 'helpR',
                event: 'getHelpR'
            }));
            client.send(JSON.stringify({
                type: 'notifications'
            }));
        }
    })
}



module.exports = helpR;