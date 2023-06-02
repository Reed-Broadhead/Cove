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
    socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });
    console.log(`user connected: ${socket.id }`);

    socket.emit("hello there", "hello there" )


    const allMessages = [];

    socket.on('send_message', (data) => {
        console.log(data.data)
        io.to(data.room).emit("receive_message", [allMessages.concat(data)])
        socket.emit("add data", data.data)
    
    })

    socket.on('new data', data => {
        allMessages.push(data[0])
    })

    socket.on('join_room', (room) => {
        socket.join(room)
        console.log(socket.rooms)
    })
    socket.on('leave_room', () => {
        const [, second] = socket.rooms
        if (second !== undefined) {
            socket.leave(second)
        }
    })
})

