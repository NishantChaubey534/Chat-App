const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const router = require('./router');

const app = express();
const server = http.createServer(app);

const io = socketio(server, {
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

// Enable CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        credentials: true,
    })
);

app.use(router);

io.on('connection', (socket) => {
    console.log('⚡ New client connected:', socket.id);

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) {
            return callback(error);
        }

        socket.join(user.room);

        // Welcome message to the user
        socket.emit('message', {
            user: 'admin',
            text: `👋 Welcome ${user.name} to room ${user.room}.`,
        });

        // Broadcast that a new user has joined
        socket.broadcast.to(user.room).emit('message', {
            user: 'admin',
            text: `🚀 ${user.name} has joined the chat!`,
        });

        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room),
        });

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        if (!user) {
            return callback('User not found!');
        }

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', {
                user: 'admin',
                text: `❌ ${user.name} has left the chat.`,
            });

            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room),
            });

            console.log(`❌ User disconnected: ${socket.id}`);
        }
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
