import React from 'react'
import imgleaf from './images/leafqt.jpg'
import { useEffect,useState } from 'react'
import userapi, { setclienttoken } from './songifyapi'
const Profile = ({token}) => {
  const [image,setImage]=useState({imgleaf});
  useEffect(()=>{
    setclienttoken(token)
     userapi.get("me").then((response)=>{
      setImage(response.data.images[0].url);
     })
},[])
  return (
    <img className="profile" src={image}></img>
  )
}

export default Profile