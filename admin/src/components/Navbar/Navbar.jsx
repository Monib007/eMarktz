import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/logo.svg'
import navProfile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={navlogo} alt="" className="nav-logo" />
        {/* <h1>eMarktz</h1> */}
        <img src={navProfile} alt="" className="nav-logo" />
    </div>
  )
}

export default Navbar