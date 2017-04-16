import React from 'react'
import moment from 'moment'

import './bill.css'

const Bill = (props) => {
  return (
    <div>
      <h3>Title: {props.title}</h3>
      <p>Introduction date: {moment(props.introductionDate).format('D MMM YYYY')}</p>
      <p>Member in charge: {props.memberInCharge}</p>
      <p>Type: {props.type}</p>
    </div>
  )
}

export default Bill
