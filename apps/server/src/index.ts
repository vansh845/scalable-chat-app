import { Server } from 'socket.io'
import { createServer } from 'http';
import express from 'express';
import { Redis } from 'ioredis';

const app = express();

const httpServer = createServer(app);
const pub = new Redis({
    host: process.env.REDIS_HOST,
    port: 19733,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD
});
const sub = new Redis({
    host: process.env.REDIS_HOST,
    port: 19733,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD
});

const PORT = process.env.PORT ? process.env.PORT : 8000
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
})
httpServer.listen(process.env.PORT ?? 8000)
sub.subscribe('message_queue')



sub.on('message', (channel, message) => {
    const msg = JSON.parse(message)
    if (msg.channel === '/vansh') {
        io.of('/vansh').emit('message', msg.message);
    }
    if (msg.channel === '/garry') {
        io.of('/garry').emit('message', msg.message);
    }
})


io.of('/vansh').on('connect', (socket) => {
    console.log('user connected to /vansh');

    socket.on('message', (message) => {
        console.log(message, 'from vansh')
        const result = pub.publish('message_queue', message);
    });

})

io.of('/garry').on('connect', (socket) => {
    console.log('user connected to /garry');

    socket.on('message', (message) => {
        pub.publish('message_queue', message)
    });
})