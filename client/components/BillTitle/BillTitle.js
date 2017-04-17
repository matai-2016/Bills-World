import React from 'react'
import { Link } from 'react-router-dom'

import './billTitle.css'

const BillInfo = (props) => {
  return (
    <div className='bill-title'>
      <Link to='/'><img className='back' src='/img/back-button.png' /></Link>
      <div className='container text-container'>
        <h3 className='title-text'>{props.title}</h3>
      </div>
    </div>
  )
}

export default BillInfo
