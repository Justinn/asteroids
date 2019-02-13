import Game from './Game';

let Client = {};
Client.socket = io.connect();

Client.addPlayer = function() {
  Client.socket.emit('addPlayer');
};

Client.updatePlayerMovement = function(id, x, y) {
  Client.socket.emit('updatePlayerMovement', {id, x, y})
}

Client.socket.on('newPlayer', function(player) {
  console.log('theres a new player');
  Game.addNewPlayer(player.id, player.x, player.y);
});

export default Client;
