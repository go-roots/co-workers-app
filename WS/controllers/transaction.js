const WebSocket = require('ws');

function transaction(wss) {
    this.wss = wss
}

transaction.prototype.updateBalance = function (user) {
    this.wss.clients.forEach(client => {
        if (client.userId == user && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: 'transaction',
                event: 'balanceUpdated'
            }));
        }
    });
}

module.exports = transaction;