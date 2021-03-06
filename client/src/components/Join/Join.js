import React from 'react'
import {Link} from 'react-router-dom'
import { useState } from 'react'


import './Join.css'
const Join = () => {
    const [name,setName]=useState('');
    const [room,setRoom]=useState('');
  return (
      
    <div className="joinOuterContainer">
        <div className="joinInnerContainer">
            <h1>
                Join
            </h1>
             <div>
                 <input type="text" placeholder='UserName'  className='joinInput' onChange={(event)=>{
                        setName(event.target.value)
                 }}   />
             </div>
             <div>
                 <input type="text" placeholder='Room' className='joinInput mt-20' onChange={(event)=>setRoom(event.target.value)}/>
             </div>


             <Link  onClick={(event)=>(!name || !room)?event.preventDefault(): null}  to={`/chat?name=${name}&room=${room}`}>
               <button className='button mt-20' type='submit' > Sign In</button>
             </Link>
        </div>
    </div>    

  )
}

export default Join;