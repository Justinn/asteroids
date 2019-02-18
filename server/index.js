const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const io = require('socket.io').listen(server);

// app.use('/css', express.static(__dirname + '/css'))
app.use(express.static(path.join(__dirname, '../public')));
app.use('/assets', express.static(__dirname + '../assets'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

server.listen(43594, () => {
  console.log(`Server Listening on ${server.address().port}`);
});

let players = {};

//Client connection
io.on('connection', function(socket) {
  console.log('player connected')
  //What to do when adding a player to the game
  players[socket.id] = {
    playerId: socket.id,
    rotation: 0,
    x: 0,
    y: 0,
  };

  socket.emit('currentPlayers', players);
  socket.broadcast.emit('newPlayer', players[socket.id]);

  //Client disconnection
  socket.on('disconnect', function () {
    console.log('player disconnected');
    delete players[socket.id];
    io.emit('disconnect', socket.id);
  });
});

function getAllPlayers() {
  Object.keys(io.sockets.connected).forEach(function(socketID) {
    const player = io.sockets.connected[socketID].player;
    if (player) players.push(player);
  });
  return players;
}
