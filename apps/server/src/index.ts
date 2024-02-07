import { Server } from 'socket.io'
import { createServer } from 'http';
import { Redis } from 'ioredis';
const httpServer = createServer();
const pub = new Redis();
const sub = new Redis();
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
    if (channel === 'message_queue') {
        io.emit('message', message)
    }
    console.log(message)
})


io.on('connect', (socket) => {
    console.log('user connected');
    socket.on('greet', (greet) => {
        console.log(greet)
    });
    socket.on('message', (message) => {
        console.log(message)
        const result = pub.publish('message_queue', message);
    });

})
