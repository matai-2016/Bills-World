import React from 'react'
import moment from 'moment'

import './bill.css'

const Bill = (props) => {
  let title = props.title
  if (title.length > 50) {
    title = title.slice(0, 50)
    title = title + '...'
  }
  return (
    <div>
      <h3>{title}</h3>
      <p>Introduction date: {moment(props.introductionDate).format('D MMM YYYY')}</p>
      <p>Member in charge: {props.memberInCharge}</p>
      <p>Type: {props.type}</p>
    </div>
  )
}

export default Bill
