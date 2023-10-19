import React from 'react'
import userapi from './songifyapi'
import { useEffect } from 'react'
import { useState } from 'react'

const Home = ({setTracks,setCurrentTrack,setCurrentIndex,audio}) => {
  const [usertopitems,setusertopitems]=useState([]);
  const [recent,setrecent]=useState([]);
  const [latest,setLatest]=useState([]);
  const [recom,setrecom]=useState([]);
  const[pick,setpick]=useState([]);
  const [songs,setsongs]=useState([]);
  // const navigate=useNavigate();
  useEffect(()=>{
    userapi.get("me/player/recently-played").then(response=>{
      // console.log(response);
      const tempfilter=(response.data.items)
      // console.log(tempfilter);
      const temp=tempfilter.filter((item)=>
        item.track.preview_url!==null
      );
    //  / console.log(temp);
      const filtertrack =[];
      let count=0;
      while(filtertrack.length!==6){
         if(!count){
           filtertrack.push(temp[count]);
         }
         else{
          let sign=0
           for(let i=0;i<filtertrack.length;i++){
            // console.log(temp);
               if(filtertrack[i].track.preview_url===temp[count].track.preview_url){
                sign=1;
                break;
               }
           }
           if(sign===0){
            filtertrack.push(temp[count]);
           }
           
         }
         if(count===temp.length&&filtertrack.length!==6){
          for(let i=filtertrack.length;i<6;i++){
             filtertrack.push(temp[i]);
          }
         }
         count++;
      }
      setrecent(filtertrack);
      //  console.log(filtertrack);
    })}
  ,[])
  //user top items




  useEffect(()=>{
    userapi.get('me/top/tracks').then((response)=>{
      // const temp=(response.data.tracks.items);
      // const filtered=temp.filter(each=>(each.preview_url!==null));
      // console.log(filtered);
      setusertopitems(response.data.items);});
   

    userapi.get('search?q=a&type=track&include_external=audio').then(response=>{
      const temp=(response.data.tracks.items);
      const filtered=temp.filter(each=>(each.preview_url!==null));
      console.log(filtered);
      setLatest(filtered);
    });

    userapi.get('search?q=b&type=track&include_external=audio').then(response=>{
      const temp=(response.data.tracks.items);
      const filtered=temp.filter(each=>(each.preview_url!==null));
      console.log(filtered);
      setrecom(filtered);
    });
     

    userapi.get('search?q=c&type=track&include_external=audio').then(response=>{
      const temp=(response.data.tracks.items);
      const filtered=temp.filter(each=>(each.preview_url!==null));
      console.log(filtered);
      setpick(filtered);
    });

    userapi.get('search?q=d&type=track&include_external=audio').then(response=>{
      const temp=(response.data.tracks.items);
      const filtered=temp.filter(each=>(each.preview_url!==null));
      console.log(filtered);
      setsongs(filtered);
    });

  },[])


  const onclicktopsongs=(index,arr)=>{
    
    console.log(index);
    console.log(arr[index]);
    
    if(!audio.current.paused){
      audio.current.pause();
    }
    setCurrentIndex(index);
    setTracks(arr);
    if(arr[index].preview_url!==undefined){
         setCurrentTrack(arr[index]);
         audio.current=new Audio(arr[index].preview_url);
    }
    else{
    setCurrentTrack(arr[index].track)
    audio.current=new Audio(arr[index].track.preview_url);
    }
    audio.current.play();
  }
  
  // const onclickeachplaylist=(id)=>{
  //   navigate(`/Playlist/${id}`,{state:{id:id}});
  // }

  const initsafe=()=>{
    const arr=[];
    for(let i=0;i<6;i++){
       arr.push(latest[i]);
    }
    return arr;
  }
  return (
    <div className='home'>
      <div className='recentlyplayed'>
            {recent.length!==0?recent.map((each,index)=>(
              <div className='recentsong' key={index} onClick={()=>{onclicktopsongs(index,recent);console.log(recent)}}>
                  <img alt='player'src={`${each.track.album.images[0].url}`}></img>
                  <p>{each.track.album.name}</p>
              </div>
            )):(initsafe().map((each,index)=>(
              <div className='recentsong' key={index} onClick={()=>{onclicktopsongs(index,recent);console.log(recent)}}>
                  <img alt='player'src={`${each.album.images[0].url}`}></img>
                  <p>{each.album.name}</p>
              </div>
            ))
            )
            }
      </div>
      <div className='topitems'>
          <h1 style={{color:"white"}}>Based on your recent listening</h1>
          <div className='topitemscontainer'>
            {/* {console.log(usertopitems)} */}
               {usertopitems.map((each,index)=>
                  (<div className='topsongs' key={index} onClick={()=>onclicktopsongs(index,usertopitems)}>
                     <img alt='player'src={`${each.album.images[0].url}`}></img>
                     <p >{each.album.name}</p>
                  </div>
                  ))
               }
          </div>
      </div>
{/* latest  */}

      <div className='topitems'>
        <h1 style={{color:'white'}}>Latest Release</h1>
        <div className='topitemscontainer'>
            {console.log(latest)}
               {latest.map((each,index)=>
                  (<div className='topsongs' key={each.id} onClick={()=>{onclicktopsongs(index,latest)}}>
                     <img alt='player'src={`${each.album.images[0].url}`}></img>
                     <p >{each.album.name}</p>
                  </div>
                  ))
               }
          </div>
      </div>

      
      <div className='topitems'>
        <h1 style={{color:'white'}}>Recommended for you</h1>
        <div className='topitemscontainer'>
            {console.log(latest)}
               {recom.map((each,index)=>
                  (<div className='topsongs' key={each.id} onClick={()=>{onclicktopsongs(index,recom)}}>
                     <img alt='player'src={`${each.album.images[0].url}`}></img>
                     <p >{each.album.name}</p>
                  </div>
                  ))
               }
          </div>
      </div>

      <div className='topitems'>
        <h1 style={{color:'white'}}>Today's Pick for you</h1>
        <div className='topitemscontainer'>
            {console.log(latest)}
               {pick.map((each,index)=>
                  (<div className='topsongs' key={each.id} onClick={()=>{onclicktopsongs(index,pick)}}>
                     <img alt='player'src={`${each.album.images[0].url}`}></img>
                     <p >{each.album.name}</p>
                  </div>
                  ))
               }
          </div>
      </div>

      <div className='homesongs'>
        <h1 style={{color:'white'}}>Try this</h1>
        <div className='homesongscontainer'>
            {console.log(latest)}
               {songs.map((each,index)=>
                  (<div className='songsatbottom' key={each.id} onClick={()=>{onclicktopsongs(index,songs)}}>
                     <img alt='player'src={`${each.album.images[0].url}`}></img>
                     <p >{each.album.name}</p>
                  </div>
                  ))
               }
          </div>
      </div>

      
      
    </div>
  )
}

export default Home
