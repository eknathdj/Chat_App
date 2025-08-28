const express = require('express');
const http = require('http');
const { createServer } = http;
const { Server } = require('socket.io');
const cors = require('cors');


const app = express();
app.use(cors());
app.get('/', (req, res) => res.send({ status: 'ok' }));


const server = createServer(app);
const io = new Server(server, {
    cors: { origin: '*' }
});


io.on('connection', (socket) => {
    console.log('socket connected:', socket.id);
    socket.on('join', (room) => {
        socket.join(room);
    });
    socket.on('message', (payload) => {
        // payload: { room, user, text }
        io.to(payload.room).emit('message', payload);
    });
    socket.on('disconnect', () => console.log('disconnected', socket.id));
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server listening on ${PORT}`));