import React from 'react'
import {Link}from 'react-router-dom'
import { FaHome} from "react-icons/fa";
import { FaSearch} from "react-icons/fa";
import {IoLibrary} from 'react-icons/io5'
import {FaSpotify} from 'react-icons/fa'
const Bottomnav = () => {
  return (
    <nav >
        <div className='navend'>
        <div>
        <FaHome/>
        <Link to='/'>Home</Link>
        </div>
        <div>
        <FaSearch/>
        <Link to='/Search'>Search</Link>
        </div>
        <div>
        <IoLibrary/>
        <Link to='/Library'>Library</Link>
        </div>
        <div>
        <FaSpotify/>
        <Link to='/Fourth'>Premium</Link>
        </div>
        </div>
    </nav>
  )
}

export default Bottomnav