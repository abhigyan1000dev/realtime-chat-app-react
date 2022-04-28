import React,{useState,useEffect} from "react";
import queryString from 'query-string';  // help in retreiving data from the URL
import io from 'socket.io-client';

import Infobar from '../InfoBar/InfoBar.js'
import Input from '../Input/Input.js'
import Messages from '../Messages/Messages.js'

let socket;
const Chat=({location})=>{
    const [name,setName]=useState('');
    const [room,setRoom]=useState('');
    const [message,setMessage]=useState('');
    const [messages,setMessages]=useState([]);

    const ENDP='https://socketio-chatapp-realtime.herokuapp.com/';
    useEffect(()=>{
        const {name,room}=queryString.parse(location.search);
        // console.log(name);

        socket=io(ENDP)
        setName(name);
        // console.log(room);
        setRoom(room);


        console.log(socket);
    socket.emit('join',{name,room},()=>{
       
    });

    //Now Component Unmouting.. Finish this hook
    return ()=>{
        socket.emit('disconnect');
        socket.off();
    }

    //Third Paramter is going to be executed when the CallBack is Called on Server socket.on
    },[ENDP,location.search])
    
    //2ne useEffect

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages([...messages,message]);
        })
    },[messages])
    

    //Function for sending Messages
  const sendMessage=(event)=>{
      
    event.preventDefault();

      if(message){
          socket.emit('sendMessage',message,()=>setMessage(''));
      }
  }

  console.log(message,messages);
    return (
        <div className="outerContainer">
      <div className="container">
       <Infobar room={room}/>
       <Messages messages={messages}  name={name}/>
       <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
       
        {/* <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}  

        //   onKeyPress={event =>event.key === 'ENTER' ? sendMessage(event) : null}
        />  */}
        {/* <button onClick={(event)=>sendMessage(event)}>Submit</button> */}
        
      </div>
    </div>

    )
}

export default Chat;

//useEffect lets you perform Side Effects into your functional Components!!

//use of socket.emit is WE CAN EMIT THINGS FROM THE CLIENT THAT will be emitted fromthe Backend.

// jo Cleint me Emit kr rhe h woh Udhr On se pakadrhe h ..