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

    socket.on('disconnect', ()=>{
        console.log('Disconnected')
    })
})

server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
})