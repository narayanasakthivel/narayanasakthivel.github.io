import React, { useEffect } from 'react'
import userapi from './songifyapi'
import { setclienttoken } from './songifyapi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Library = ({token,playlistimg,setPlaylistimg,playlistname,setplaylistname}) => {
  const [playlist,setPlaylist]=useState([]);
  useEffect(()=>{
     userapi.get("me/playlists").then((response)=>{
      setPlaylist(response.data.items);
      console.log(response);
     })
  },[])
  const navigate=useNavigate();
  const gotoplaylist=(id,each)=>{
    if(id.length!==0){
      navigate(`/Playlist/${id}`,{state:{id:id}});console.log(id );
      setPlaylistimg(each.images[0].url);
      setplaylistname(each.name);
    }
  }
  return (
     <div className='liblist'>
        {playlist.length?playlist.map((each)=>
          (
          <div className='lib-playlist' key={each.id} onClick={()=>gotoplaylist(each.id,each)}>
          <p>{each.name}</p>
          <img src={each.images[0].url}></img>
          </div>
          )
        ):(<></>)}
     </div>
  )
}

export default Library