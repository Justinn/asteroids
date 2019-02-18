import Game from './Game';

let Client = {};
Client.socket = io.connect();

Client.addPlayer = function() {
  Client.socket.emit('addPlayer');
};

Client.updatePlayerMovement = function(x, y) {
  Client.socket.emit('updatePlayerMovement', { x, y });
};

Client.socket.on('newPlayer', function(player) {
  console.log('theres a new player');
  Game.addNewPlayer(player.id, player.x, player.y);
});

Client.socket.on('allPlayers', function(data) {
  for (let i = 0; i < data.length; i++) {
    Game.addNewPlayer(data[i].id, data[i].x, data[i].y);
  }

  Client.socket.on('move', function(data) {
    console.log('PLAYER MOVED!!')
    console.log(data)
    Game.updatePlayerMovement(data.id, data.x, data.y);
  });
});

export default Client;
