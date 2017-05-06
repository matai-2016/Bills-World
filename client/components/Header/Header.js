import React from 'react'
import { Link } from 'react-router-dom'

import Login from '../../containers/Login/Login'
import './header.css'

const Header = () => {
  return (
    <div className='header'>
      <div className='logo'>
        <Link to='/'>
          <img className='img-responsive' src='/img/beehive-white.png' />
        </Link>
      </div>
      <div className='header-title'>
        <Link to='/'>Bill's World </Link>
      </div>
      <Login />
    </div>
  )
}

export default Header
