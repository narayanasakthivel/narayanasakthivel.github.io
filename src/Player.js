import React from 'react'
import { useState,useEffect,useRef } from 'react';
import { FaPlay } from "react-icons/fa";
import {BiSkipNext} from "react-icons/bi"
import {BiSkipPrevious} from 'react-icons/bi'
import {FaPause} from 'react-icons/fa'
import {FaChevronDown} from 'react-icons/fa6'
import {BiDotsVerticalRounded} from 'react-icons/bi'
const Player = ({currentTrack,setCurrentTrack,curentIndex,setCurrentIndex,tracks,setTracks,audio,isplaying,setisplaying,activesong,setactivesong}) => {
    const [percentage,setPercentage]=useState(0);
    const [position,setPosition]=useState(0);
    const [margin,setMargin]=useState(0);
    const [current,setCurrent]=useState("0.00")
    const [songduration,setsongduration]=useState("0.00")
    const [start,setstart]=useState(false)
    //const audio= useRef(new Audio(currentTrack.preview_url))
    audio.current.volume=1;
    const nextsong=()=>{
      audio.current.pause();
      console.log(currentTrack.preview_url+"======url");
      if(curentIndex===tracks.length-1){
        if(tracks[0].preview_url!==undefined){
          audio.current=new Audio(tracks[0].preview_url);
        }
        else{
        audio.current=new Audio(tracks[0].track.preview_url)
        }
      }
      else{
        if(tracks[curentIndex+1].preview_url!==undefined){
          // console.log(tracks[curentIndex+1]);
          audio.current=new Audio(tracks[curentIndex+1].preview_url)
        }
        else
        audio.current=new Audio(tracks[curentIndex+1].track.preview_url)
      }
      audio.current.play();
      setPercentage(0);
    }
    const prevsong=()=>{
      audio.current.pause();
      console.log(currentTrack.preview_url+"======url");
      if(curentIndex===0){
        if(tracks[tracks.length-1].preview_url!==undefined){
          audio.current=new Audio(tracks[tracks.length-1].preview_url);
        }
        else
        audio.current=new Audio(tracks[tracks.length-1].track.preview_url)
      }
      else{
        if(tracks[curentIndex-1].preview_url!==undefined){
          audio.current=new Audio(tracks[curentIndex-1].preview_url);
        }
        else
        audio.current=new Audio(tracks[curentIndex-1].track.preview_url)
      }
      audio.current.play();
      
    }

      
   
    useEffect(()=>{
      if(percentage===100){
        if(curentIndex===tracks.length-1){
           
          if(tracks[0].preview_url!==undefined){
            setCurrentTrack(tracks[0]);
          }
          else
          setCurrentTrack(tracks[0].track)
          setCurrentIndex(0);
          nextsong();
         }
         else{
        if(tracks[curentIndex+1]!==undefined){
          setCurrentTrack(tracks[curentIndex+1])
        }
        else
         setCurrentTrack(tracks[curentIndex+1].track)
         setCurrentIndex(curentIndex+1);
         
         nextsong();
         }
         
      }
       setPosition(percentage);
       setMargin((20/100)*percentage*-1)
       audio.current.addEventListener('timeupdate',updatepercentage)
       return ()=>{
          audio.current.removeEventListener('timeupdate',updatepercentage)
       }
    },[percentage])
    const updatepercentage=()=>{
      setPercentage((audio.current.currentTime.toFixed(2)/audio.current.duration.toFixed(2))*100);
      setCurrent(((Math.round(audio.current.currentTime))/100).toFixed(2))
      if(isNaN(((audio.current.duration)/100).toFixed(2))){
        setsongduration("0.00")
      }
      else{
      setsongduration(((audio.current.duration)/100).toFixed(2))
      }
    }
    
    console.log("percent"+{percentage})
    const onclickplaybutton=()=>{
         if(audio.current.paused){
          console.log(currentTrack)
          console.log(currentTrack.preview_url+"song url");
          audio.current.play();
          // setstart(true)
          setisplaying(true)
          console.log(audio.current.src+"this is the source")
         }
         else{
          audio.current.pause();
          setisplaying(false)
         }
         updatepercentage();
    }
    const onclickprebutton=()=>{
         if(curentIndex===0){
          if(tracks[tracks.length-1].preview_url!==undefined){
            setCurrentTrack(tracks[tracks.length-1]);
          }
          else
          setCurrentTrack(tracks[tracks.length-1].track)
         
          setCurrentIndex(tracks.length-1);
          prevsong();
         }
         else{
          if(tracks[curentIndex-1].preview_url!==undefined){
            setCurrentTrack(tracks[curentIndex-1]);
          }
          else
         setCurrentTrack(tracks[curentIndex-1].track)
         
         setCurrentIndex(curentIndex-1)
         prevsong();
         }
         updatepercentage();
    }
    const onclicknextbutton=()=>{
         if(curentIndex===tracks.length-1){
          setCurrentIndex(0);
          if(tracks[0].preview_url!==undefined){
            
            setCurrentTrack(tracks[0]);
          }
          else
          setCurrentTrack(tracks[0].track)
        
          nextsong();
         }
         else{
          console.log(tracks);
          if(tracks[curentIndex+1].preview_url!==undefined){
            setCurrentTrack(tracks[curentIndex+1]);
          }
          else
         setCurrentTrack(tracks[curentIndex+1].track)
         setCurrentIndex(curentIndex+1);
         
         nextsong();
         }
         updatepercentage();
    }

    // if(Object.keys(currentTrack).length===0||(!currentTrack))
    // return null;

    

  return (
    <div className='player' >
     
        {currentTrack?
        (<><div className="forblur"style={{backgroundImage:`url(${currentTrack.album.images[0].url})`}}></div><div className='playeralign'><div className='playelements'>
        {/* <img className="forblur"src={currentTrack.album.images[0].url}></img> */}
        <div class="playernav"><FaChevronDown/><h3>PLAYING FROM PLAYLIST</h3><BiDotsVerticalRounded/></div>
        <img className="playerimg"src={currentTrack.album.images[0].url}></img>
        <div className='songflow'>
        <div className='artist'>
        <div className='songname'>
        <p style={{color:"white"}}>{currentTrack.album.name}</p>
        </div>
        <div className='songartist'>
        <p style={{color:"white"}}>{currentTrack.album.artists[0].name}</p>
        </div>
        </div>
        <div className='progressbar'>
        <div className='slider'>
          <div className='grey' style={{width:`${percentage}%`}}></div>
        </div>
        <div className='circle' style={{left:`${position}%`,marginLeft:`${margin}px`}}></div>
        <input type="range" value={percentage} onChange={(e)=>{setPercentage(e.target.value);audio.current.currentTime=((audio.current.duration/100)*e.target.value)}}></input>
        </div>
        <div className='timings'>
        <label>{current}</label>
        <label>{songduration}</label>
        </div>
        <div className='buttons'>
        <label onClick={()=>onclickprebutton()} ><BiSkipPrevious/></label>
        <label  onClick={()=>{onclickplaybutton();}}> {audio.current.paused?<FaPlay/>:<FaPause/>}</label>
        <label  onClick={()=>{onclicknextbutton()}}><BiSkipNext/></label>
        </div>
        </div>
        </div></div></>):(<></>)}
    </div>
    
  )
    
}

export default Player