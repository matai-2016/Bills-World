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
      <h4 className='title'>Bill's World</h4>
      <Login />
    </div>
  )
}

export default Header
