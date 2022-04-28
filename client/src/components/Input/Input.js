import React from 'react'
import './Input.css'
const Input = ({message,setMessage,sendMessage}) => (
   
<form className='form'>
  <input
  className='input'
  type='text'
  placeholder='Type a message...'
  value={message}
  onChange={(event) => setMessage(event.target.value)}
  // <button onClick={(event)=>sendMessage(event)}>Submit</button>
  />

<button className='sendButton'  onClick={(event)=>sendMessage(event)}> SEND </button>

</form>
  )

export default Input