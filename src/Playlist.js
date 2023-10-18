import React from 'react'
import {useLocation} from 'react-router-dom'
import { useEffect} from 'react';
import userapi from './songifyapi'
const Playlist = ({currentTrack,setCurrentTrack,curentIndex,setCurrentIndex,tracks,setTracks,audio,isplaying,setisplaying,isavailable,setAvailabel,playlistimg,playlistname}) => {
  const location =useLocation();
  // const [distance,setdistance]=useState(0);
  // const [start,setStart]=useState(false);
  
//   const resizeimage=()=>{
//     setdistance(window.scrollY);
//     console.log(window.scrollY);
//     const img=document.getElementsByClassName('playlistimg')[0];
//     // const imgcon=document.getElementsByClassName('playlistimg')[0];
//     if(img!==undefined&&img!==null){
//     if(window.scrollY>100){
//         img.style.width='0px'
//         //  imgcon.style.height='0px';
//     }
//     else if(window.scrollY>50){
//       img.style.width="100px";
//       // imgcon.style.height='120px';
//     }
//     else{
//       img.style.width='300px';
//       //  imgcon.style.height='320px';
//     }
//     }
//     }
//   useEffect(()=>{
//   window.addEventListener("scroll",()=>{resizeimage()});
//   return ()=>{
//     window.removeEventListener('scroll',()=>{});
//   }
// },[])
  
  const checktoplay=()=>{
    if(currentTrack!==undefined){
    if(!audio.current.paused){
    audio.current.pause();
    console.log("pausecalled")
    }
    if(curentIndex===tracks.length-1){
    audio.current=new Audio(tracks[0].track.preview_url)
   
    }
    else{
      audio.current=new Audio(tracks[curentIndex+1].track.preview_url)
    }
    if(audio.current.paused&&isplaying){
    audio.current.play();
    console.log("playcalled")
    }
    }
  } 
    
  useEffect(()=>{
    console.log(location.state.id);
    userapi.get("playlists/"+location.state?.id+"/tracks").then((response)=>{
      console.log(response);
      const filtertracks=response.data.items;
      const crttracks=(filtertracks.filter((trackeach,i)=>trackeach.track.preview_url!==null));
      setTracks(crttracks);
      if(!isavailable){
       audio.current=new Audio(crttracks[0].track.preview_url);
       setAvailabel(true);
      }
    })
  })
  const checkfornext=()=>{
    if(audio.current.currentTime===audio.current.duration){
      if(curentIndex===tracks.length-1){
        setCurrentIndex(0);
        setCurrentTrack(tracks[0].track)
        checktoplay()
       }
       else{
       setCurrentTrack(tracks[curentIndex+1].track)
       setCurrentIndex(curentIndex+1);
       checktoplay()
       }
       console.log(curentIndex+"has been set and changed to next song")
    }
  }
  useEffect(()=>{
    audio.current.addEventListener('timeupdate',checkfornext)
    return ()=>{
      audio.current.removeEventListener('timeupdate',()=>{});
    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[curentIndex])


  const onclickeachsong=(index)=>{
    console.log(index);setCurrentIndex(index);
    setCurrentTrack(tracks[index].track);
    console.log(audio.current.paused+"result end")
    audio.current.pause();
    audio.current=new Audio(tracks[index].track.preview_url);
    audio.current.play()
    setisplaying(true)
  }
  // console.log(tracks+"trackspresent");
  return (
    <div className='playlist-container'>
      <div className='playlistnav'>
      <div className='playlistimg'>
      <img className='playinimg' alt='player' src={playlistimg} ></img>
      </div>
       <div className='playlisttitle'>
       <h3>{playlistname}</h3>
       </div>
       </div>
    <div className='playlist'>
      
       {tracks?tracks.map((each,index)=>(
         
           (
           <div className={`eachsong ${curentIndex===index&&each.track===currentTrack?'activesong':''}`} key={index} onClick={()=>{onclickeachsong(index)}}>
           <img alt='player'src={each.track.album.images[0].url}></img>
           <p>{each.track.name}</p>
           </div> )
       )):<><h1>Oops No songs found</h1></>}
    </div>
    </div>
  )
}
export default Playlist
