const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname,'../public');
var port = process.env.port || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('New User Connected');

    //socket.emit from Admin, text-Welcome to the chat app
    socket.emit('newMessage',{
        from : 'Admin',
        text : 'Welcome to the chat app',
        createdAt : new Date().getTime()
    });

    //socket.broadcast.emit from Admin, text-New User joined
    socket.broadcast.emit('newMessage', {
        from : 'Admin',
        text : 'New User joined',
        createdAt : new Date().getTime()
    });

    //emits newEmail to client
    // socket.emit('newMessage',{
    //     from : 'mala@gmail.com',
    //     text : 'new message from mala',
    //     createdAt : 123
    // });

    //listening for a custom event
    socket.on('createMessage', (message)=>{
        console.log('createMessage ', message);
        //broadcasting the new created message
        // io.emit('newMessage',{
        //     from : message.from,
        //     text : message.text,
        //     createdAt : new Date().getTime()
        // });

        //sending message to everyone else except from the sender
        socket.broadcast.emit('newMessage',{
            from : message.from,
            text : message.text,
            createdAt : new Date().getTime()
        })

    })

    socket.on('disconnect', ()=>{
        console.log('Disconnected')
    });
})

server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
})