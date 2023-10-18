import React, { useEffect } from 'react'
import imagesong from './images/leafqt.jpg'
import { useNavigate } from 'react-router-dom';
import {FaPlay} from 'react-icons/fa'
import { FaPause } from 'react-icons/fa';
const Currentsong = ({currentTrack,setCurrentTrack,curentIndex,setCurrentIndex,tracks,setTracks,audio,isavailable,setAvailabel,percentdown,setPercentDown}) => {
  const navigate=useNavigate(); 
  const gotoplayer=()=>{
      navigate('/Player');
  } 
  const checktoplay=()=>{
    if(currentTrack!==undefined){
    if(!audio.current.paused){
    audio.current.pause();
    // console.log("pausecalled")
    }
    if(curentIndex===tracks.length-1){
      if(tracks[0].preview_url!==undefined){
        audio.current=new Audio(tracks[0].preview_url)
      }
      else{
    audio.current=new Audio(tracks[0].track.preview_url)
      }
    }
    else{
      if(tracks[curentIndex+1].preview_url!==undefined){
        audio.current=new Audio(tracks[curentIndex+1].preview_url)
      }
      else{
      audio.current=new Audio(tracks[curentIndex+1].track.preview_url)
      }
    }
    console.log(audio.current+"oncurrentchangesat"+curentIndex)
    if(audio.current.paused){
    audio.current.play();
    }
    }
  } 
  const shortprogress=()=>{
    //  if(isavailable){
     const percent=((audio.current.currentTime.toFixed(2)/audio.current.duration.toFixed(2))*100)
     setPercentDown(percent);
    //  }
     
     if(audio.current.currentTime===audio.current.duration){
      if(curentIndex===tracks.length-1){
        setCurrentIndex(0);
        if(tracks[0].preview_url!==undefined){
          setCurrentTrack(tracks[0]);
        }
        else
        setCurrentTrack(tracks[0].track)
        checktoplay()
       }
       else{
        if(tracks[curentIndex+1].preview_url!==undefined){
          setCurrentTrack(tracks[curentIndex+1]);
        }
        else
       setCurrentTrack(tracks[curentIndex+1].track)
       setCurrentIndex(curentIndex+1);
       checktoplay()
       }
     }
  }
 useEffect(()=>{
  audio.current.addEventListener('timeupdate',()=>{shortprogress()})
      // console.log("useEffectwroks where current index is"+curentIndex);
   return ()=>{
      audio.current.removeEventListener('timeupdate',()=>{});
   }
 },[currentTrack])
 const onclickshortbtn=()=>{
  if(isavailable){
   if(audio.current.paused){
    audio.current.play();
   }
   else{
    audio.current.pause();
   }
  }
 }   
 
    if (!currentTrack || Object.keys(currentTrack).length === 0) {
        return null;
      }
  return (
    <div className='currentsong' >
        {/* {console.log(currentTrack)} */}
        {(currentTrack!==null)?(<div className="shortcut">
        <img src={currentTrack.album.images[0].url} onClick={()=>{gotoplayer()}}></img>
        <p onClick={()=>{gotoplayer()}}>{currentTrack.album.name}</p>
        <div className='progress'>
          <div className="fills" style={{width:`${percentdown}%`}}>
          </div>
        </div>
        <label style={{color:"black"}} onClick={()=>onclickshortbtn()}>{audio.current.paused?<FaPlay/>:<FaPause/>}</label>
        </div>):(<><div></div></>)}
    </div>
  )
}

export default Currentsong