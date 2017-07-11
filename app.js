import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';


const port = process.env.PORT || 3000;
const app = express();
const server = http.Server(app);
const io = new SocketIO(server);


let users = [];
let connections = [];

app.get('/', (req,res) => {
  res.sendFile(`${__dirname}/index.html`)
});

server.listen(port, () => {
    console.log('[INFO] Listening on *:' + port);
});

io.on('connection', (socket) => {
  connections.push(socket)
  console.log(`Connected: ${connections.length} sockets connected`)

  // Disconnect
  socket.on('disconnect', (data) => {
    connections.splice(connections.indexOf(socket), 1);
    console.log(`Disconnected: ${connections.length} sockets connected`);
  })
  socket.on('send message', (data) => {
    io.sockets.emit('new message', {msg: data});
  })
});
