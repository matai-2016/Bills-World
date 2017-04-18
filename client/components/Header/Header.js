import React from 'react'
import { Link } from 'react-router-dom'

import Login from '../Login/Login'
import './header.css'

const Header = () => {
  return (
    <div className='header'>
      <Link to='/'>
        <div className='logo'>
          <img className='img-responsive' src='/img/beehive-white.png' />
        </div>
      </Link>
      <Link to='/'>
        <p className='header-title'>Bill's World</p>
      </Link>
      <Login />
    </div>
  )
}

export default Header
