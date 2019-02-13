const express = require('express')
const app = express();
const server = require('http').Server(app)
const io = require('socket.io').listen(server)

app.use('/css', express.static(__dirname + '/css'))
app.use('/client', express.static(__dirname + '/client'))
app.use('/assets', express.static(__dirname + '/assets'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

server.listen(43594, () => {
    console.log(`Server Listening on ${server.address().port}`)
})