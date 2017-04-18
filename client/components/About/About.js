import React from 'react'

import './about.css'

const Header = () => {
  return (
    <div className='about'>
      <div className='logo-container'>
        <img className='logo-img' src='/img/logo.png' />
      </div>
      <div className='features-container'>
        <div className='compressor'>
          <div className='feature feature-1'>
            <h3 id='feature-text'>View Current Bills</h3>
            <img className='feature-img' src='/img/rma.png' />
          </div>
          <div className='feature feature-2'>
            <h3 id='feature-text'>Join the Polls</h3>
            <img className='feature-img' src='/img/poll_360.png' />
          </div>
          <div className='feature feature-2'>
            <h3 id='feature-text'>Debate the Something</h3>
            <img className='feature-img' src='/img/parliament.png' />
          </div>
        </div>
      </div>
      <div className='description'>
        <div className='description-text'>
          <p>Bills world lets you lorem ipsum dolor sit amet, consectetur adipiscing elit donec placerat.</p>
        </div>
        <div className='sign-up-text'>
          <h4 id='scroll-to-see'>Scroll to see current bills or <button className='btn btn-default sign-up-button' onClick={() => this.props.onLoginClick()}>Sign Up</button></h4>
        </div>
      </div>
    </div>
  )
}

export default Header
