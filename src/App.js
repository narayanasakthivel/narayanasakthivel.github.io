import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import {setclienttoken} from './songifyapi'
import { useState,useEffect } from 'react';
import Bottomnav from './Bottomnav';
import Home from './Home'
import Library from './Library'
import Search from './Search'
import Fourth from './Fourth'
import Profile from './Profile';
import  Playlist  from './Playlist';
function App() {
  const clientid="a64099c5dcc94501a3d7c89d196363a3";
  const redirect="http://localhost:3000";
  const auth="https://accounts.spotify.com/authorize";
  const scopes=["user-read-private","user-read-email"];
  const [token,setToken]=useState('');
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
  },[]);
  return (
    <div className="App">
      <header className="App-header">
      {(!token)?
      (<a href={`${auth}?client_id=${clientid}&redirect_uri=${redirect}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}>Login</a>):
      (
      <>
      <Profile token={token}/>
      <Bottomnav /><Routes>
      <Route path='/Search' element={<Search />}></Route>
      <Route path='/Library' element={<Library token={token}/>}></Route>
      <Route path='/Fourth' element={<Fourth />}></Route>
      <Route path='/' element={<Home />}></Route>
      <Route path='/Playlist' element={<Playlist/>}></Route>
      </Routes></> 
      )}
      </header>
    </div>
  );
}

export default App;
