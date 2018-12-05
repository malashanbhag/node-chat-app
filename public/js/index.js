var socket = io();
            
socket.on('connect', function(){
    console.log('Connected to server')

   //creating a custom event
   socket.emit('createMessage', {
       from : 'Mala',
       text : 'Data passed from front end' 
   })
})

socket.on('disconnect', function(){
    console.log('Disconnected from server')
})

socket.on('newMessage', function(message){
    console.log('new message ', message);
})