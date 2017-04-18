import React from 'react'
import { Link } from 'react-router-dom'

import CommentCount from '../CommentCount/CommentCount'

import './bill.css'

const Bill = (props) => {
  let title = props.title
  if (title.length > 50) {
    title = title.slice(0, 50)
    title = title + '...'
  }
  return (
    <div className='bill-container'>
      <div className='bill-name-container'>
        <Link id='bill-name' to={`./${props.billNumber}`}>{title}</Link>
      </div>
      <div className='detail-container-small'>
        <p id='member-in-charge'><img className='member-img' src='/img/member.png' />{props.memberInCharge}</p>
      </div>
      <div className='comment-count'>
        <CommentCount billNumber={props.billNumber} comments={props.comments} />
      </div>
    </div>
  )
}

export default Bill
