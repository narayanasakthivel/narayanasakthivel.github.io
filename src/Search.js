import React, { useState,useEffect } from 'react'
import {FaSearch} from 'react-icons/fa'
import userapi from './songifyapi'
const Search = ({tracks,setTracks,currentTrack,setCurrentTrack,curentIndex,setCurrentIndex,audio}) => {
  // const [text,setText]=useState(null);
   const [searchitems,setsearchitems]=useState([]);
   const search=(text)=>{
     if(text!==''){
      console.log(text);
      userapi.get('search?q='+text+'&type=track&include_external=audio').then(response=>{
        const temp=(response.data.tracks.items);
        const filtered=temp.filter(each=>(each.preview_url!==null));
        console.log(filtered);
        setsearchitems(filtered);
      });
     }
    }

    const onclickresults=(index)=>{
      setTracks(searchitems);
      setCurrentIndex(index);
      setCurrentTrack(searchitems[index]);
      if(!audio.current.paused){
        audio.current.pause();
      }
      audio.current=new Audio(searchitems[index].preview_url);
      audio.current.play();
      
    }
  return (
    <div className='search'>
      <div className='search-field'>
          <input autofocus placeholder="What do you want to listen to?" onChange={(e)=>search(e.target.value)}></input>
      </div>
      <div className='results'>
           {searchitems.length?
           (searchitems.map((each,index)=>(<div className='result-fields' key={index} onClick={()=>{onclickresults(index)}}>
               <img src={each.album.images[0].url}></img>
               <p>{each.album.name}</p>
           </div>))):<></>}
      </div>
    </div>
  )
}

export default Search