const express = require('express');
const app = express();
const {Server} =  require('socket.io')
const cors = require('cors')

const io = new Server(3000, {
    cors: {
        origin: ['http://localhost:5173']
    }
});

app.use(cors())

io.on("connection", (socket) => {
    // socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });
    console.log(`user connected: ${socket.id }`);

    socket.on('send_message', (stuff) => {
        console.log(stuff)
    })
})

