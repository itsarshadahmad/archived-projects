const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const sockets = require("./sockets")

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 8000;

sockets(io);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));