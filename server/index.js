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

io.on('connection', function(socket) {
  socket.on('addPlayer', function() {
    socket.player = {
      x: 0,
      y: 0,
    };
    //socket.emit('allplayers', getAllPlayers());
    socket.broadcast.emit('newPlayer', socket.player);
  });
});
