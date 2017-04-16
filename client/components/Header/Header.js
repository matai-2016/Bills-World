import React from 'react'

import Login from '../Login/Login'
import './header.css'

const Header = () => {
  return (
    <div className='header'>
      <div className='logo'>
        <img className='img-responsive' src='/img/beehive-white.png' />
      </div>
      <h4 className='title'>Bill's World</h4>
      <Login />
    </div>
  )
}

export default Header
