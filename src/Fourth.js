import React, { useEffect, useState } from 'react'
import userapi from './songifyapi'
const Fourth = () => {
  const [user,setUser]=useState();
  const [following,setFollowing]=useState();
  useEffect(()=>{
    async function getuserdetails(){
     const temp1=await userapi.get('me')
     console.log(temp1);
     setUser(temp1);
    const temp2=await userapi.get("me/following?type=artist");
    console.log(temp2);
    setFollowing(temp2);
    }
    getuserdetails();
  },[])
    
  return (
    <>
    {user&&following?
    <div className='profilef'>{console.log(user)}
      <img alt="player"src={user.data.images[0].url}></img>
      <div className='usedetails'>
           <h1>{user.data.display_name}</h1>
           <div className='follow'>
                <p>{`${user.data.followers.total} followers`}</p>
                <p>{`${following.data.artists.total} following`}</p>
           </div>
      </div>
    </div>:<></>}
    </>
  )
}

export default Fourth