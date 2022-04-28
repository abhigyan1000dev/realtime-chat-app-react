const users=[];

const addUser=({id,name,room})=>{
    //Abhigyan Sharma --> abhigyansharma
    name=name.trim().toLowerCase();
    room=room.trim().toLowerCase();


   const existingUser=users.find((user)=>user.room===room && user.name===name);
   // if the user is already present...
   if(existingUser)
   {
       return {error:'UserName is Taken'};
   }
    
   //else add the user into Array
   const user={id,name,room};
   users.push(user);

   return {user};
}


const removeUser=(id)=>{
  const index=users.findIndex((user)=>user.id===id);
  if(index!=-1)
  {
      return users.splice(index,1)[0];
  }
}
const getUser=(id)=>users.find((user)=>user.id===id);


const getUsersInRoom=(room)=>users.filter((user)=>user.room==room);


module.exports= {addUser,removeUser,getUser,getUsersInRoom};