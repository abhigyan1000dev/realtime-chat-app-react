const express =require('express');
const socketio=require('socket.io');  
const cors = require('cors');

const {addUser,removeUser,getUser,getUsersInRoom} =require('./users.js')


const http=require('http');
const PORT=process.env.PORT ||5000;

const router=require('./router.js');
const { Socket } = require('dgram');


const app=express();

const server=http.createServer(app); //create server using express
const io=socketio(server);


app.use(cors());
app.use(router);

io.on('connection',(socket)=>{
  socket.on('join',({name,room},callback)=>{
   
  const {error,user}=addUser({id:socket.id,name,room});


if(error)
{
  return callback(error);
}

//Admin Messages k lie
 //Line 34 tells that the user that he is Welcome to chat ..
        //Line 35 tells all others beside the user that the user has joined...
    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
// //it sends message to all other beside that specific user


//If there are no errrs
socket.join(user.room);
     

//For other users to be in Room
io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)})


callback();
   });

//user messages k lie
socket.on('sendMessage',(message,callback)=>{
    const user =getUser(socket.id);

    io.to(user.room).emit('message',{user:user.name, text:message});
    io.to(user.room).emit('roomData',{room:user.room, users:getUsersInRoom(user.room)});
    callback();
})



//We are not getting the User Admin Welcome Message as we Haven't removed the particular user..

  socket.on('disconnect',()=>{
   const user=removeUser(socket.id);  // disconnects a user  return bool


   if(user)   // if left we will let others know..

   {
     io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left the chat..`})
   }

  })   
});






app.use(router);
server.listen(PORT,()=>console.log(`Server has started on port  ${PORT}`));


//Emit Frontend Se bakcend emiit
//on expect the thing from backend..