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

let players = [];

io.on('connection', function(socket) {
  socket.on('addPlayer', function() {
    socket.player = {
      id: players.length,
      x: 0,
      y: 0,
    };
    socket.emit('allplayers',getAllPlayers());
    socket.broadcast.emit('newPlayer', socket.player);
  });

  socket.on('updatePlayerMovement', function(player) {
      console.log(player)
  })
});

function getAllPlayers(){
    Object.keys(io.sockets.connected).forEach(function(socketID){
        const player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}