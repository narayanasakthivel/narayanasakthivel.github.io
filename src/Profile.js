import React from 'react'
import imgleaf from './images/leafqt.jpg'
import { useEffect,useState } from 'react'
import userapi, { setclienttoken } from './songifyapi'
const Profile = ({token}) => {
  const [image,setImage]=useState({imgleaf});
  const [name,setname]=useState('');
  useEffect(()=>{
    setclienttoken(token)
     userapi.get("me").then((response)=>{
      if(response.data.images[0].url!==undefined)
      setImage(response.data.images[0].url);
    else{
      setname(response.data.display_name[0]);
    }
     })
},[token])
  return (
    image?(<img className="profile"  alt='profile'src={image}></img>):<div className='profile'><p>{name}</p></div>
  
  )
}

export default Profile
