import Game from './Game';

let Client = {};
Client.socket = io.connect();

Client.addPlayer = function() {
  Client.socket.emit('addPlayer');
};

Client.socket.on('newPlayer', function(data) {
  console.log('theres a new player');
  Game.addNewPlayer(data.x, data.y);
});

export default Client;
