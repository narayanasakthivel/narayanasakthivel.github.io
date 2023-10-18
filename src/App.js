import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import {setclienttoken} from './songifyapi'
import { useState,useEffect,useRef } from 'react';
import Bottomnav from './Bottomnav';
import Home from './Home'
import Library from './Library'
import Search from './Search'
import Fourth from './Fourth'
import Profile from './Profile';
import  Playlist  from './Playlist';
import Currentsong from './Currentsong';
import Player from './Player';
import { useNavigate } from 'react-router-dom';
function App() {
  const clientid="a64099c5dcc94501a3d7c89d196363a3";
  const redirect="http://localhost:3000";
  const auth="https://accounts.spotify.com/authorize";
  const scopes=["user-read-private","user-read-email","user-read-recently-played","user-top-read","playlist-read-private","user-follow-read"];
  const navigate=useNavigate();
  const [token,setToken]=useState('');
  const [currentTrack,setCurrentTrack]=useState();
  const [curentIndex,setCurrentIndex]=useState(-1);
  const [tracks,setTracks]=useState([]);
  const [percentdown,setPercentDown]=useState(0);
  const [isplaying,setisplaying]=useState(false);
  const [isavailable,setAvailabel]=useState(false);
  const [playlistimg,setPlaylistimg]=useState();
  const [playlistname,setplaylistname]=useState();
  const [activesong,setactivesong]=useState(-1);
  const audio=useRef(new Audio());
  useEffect(()=>{
     setToken(window.localStorage.getItem("Token"));
     const path=window.location.hash;
     window.location.hash='';
     if(!token&&path){
     const temp=(path.split('&')[0].split('=')[1]);
     setToken(temp);
     window.localStorage.setItem("Token",temp);
     setclienttoken(temp);
     console.log("token set for first time");
     }
     else{
     console.log(token);
     setclienttoken(window.localStorage.getItem("Token"));
     console.log("token executed")
     console.log(token);
     }
  },[token]);
  return (
    <div className="App">
      <header className="App-header">
      {(!token)?
      (<div className="login"><a href={`${auth}?client_id=${clientid}&redirect_uri=${redirect}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true` }>Login</a></div>):
      (
      <>
      <Profile token={token}/>
      <Bottomnav />
      <Currentsong currentTrack={currentTrack}setCurrentTrack={setCurrentTrack} curentIndex={curentIndex} setCurrentIndex={setCurrentIndex} tracks={tracks}setTracks={setTracks} audio={audio}isavailable={isavailable}setAvailabel={isavailable}percentdown={percentdown}setPercentDown={setPercentDown}/>
      <Routes>
      <Route path='/Search' element={<Search tracks={tracks}setTracks={setTracks} currentTrack={currentTrack}setCurrentTrack={setCurrentTrack} curentIndex={curentIndex} setCurrentIndex={setCurrentIndex} audio={audio}/>}></Route>
      <Route path='/Library' element={<Library token={token} playlistimg={ playlistimg}setPlaylistimg={setPlaylistimg}playlistname={playlistname}setplaylistname={setplaylistname}/>}></Route>
      <Route path='/Fourth' element={<Fourth />}></Route>
      <Route path='/' element={<Home tracks={tracks}setTracks={setTracks} currentTrack={currentTrack}setCurrentTrack={setCurrentTrack} curentIndex={curentIndex} setCurrentIndex={setCurrentIndex} audio={audio}/>}></Route>
      <Route path='/Playlist/:id' element={<Playlist currentTrack={currentTrack}setCurrentTrack={setCurrentTrack} curentIndex={curentIndex} setCurrentIndex={setCurrentIndex} tracks={tracks}setTracks={setTracks} audio={audio} percentdown={percentdown}setPercentDown={setPercentDown} isplaying={isplaying}setisplaying={setisplaying}isavailable={isavailable}setAvailabel={setAvailabel} playlistimg={playlistimg}setPlaylistimg={setPlaylistimg}playlistname={playlistname}setplaylistname={setplaylistname} activesong={activesong} setactivesong={setactivesong}/>}></Route>
      <Route path="/Player" element={<Player currentTrack={currentTrack}setCurrentTrack={setCurrentTrack} curentIndex={curentIndex} setCurrentIndex={setCurrentIndex} tracks={tracks}setTracks={setTracks} audio={audio} percentdown={percentdown}setPercentDown={setPercentDown}isplaying={isplaying}setisplaying={setisplaying}  activesong={activesong} setactivesong={setactivesong}/>}></Route>
      </Routes></> 
      )}
      </header>
    </div>
  );
}

export default App;
