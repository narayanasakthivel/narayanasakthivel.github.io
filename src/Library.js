import React, { useEffect } from 'react'
import userapi from './songifyapi'
import { setclienttoken } from './songifyapi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Library = ({token}) => {
  const [playlist,setPlaylist]=useState([]);
  useEffect(()=>{
     userapi.get("me/playlists").then((response)=>{
      setPlaylist(response.data.items);
      console.log(response.data.items);
     })
  },[])
  const navigate=useNavigate();
  const gotoplaylist=(id)=>{
    if(id.length!==0){navigate("/Playlist",{state:{id:id}});console.log(id )}
  }
  return (
     <div className='liblist'>
        {playlist.length?playlist.map((each)=>
          (
          <div className='lib-playlist' key={each.id} onClick={()=>gotoplaylist(each.id)}>
          <p>{each.name}</p>
          <img src={each.images[0].url}></img>
          </div>
          )
        ):(<></>)}
     </div>
  )
}

export default Library