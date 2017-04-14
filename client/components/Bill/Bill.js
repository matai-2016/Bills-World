import React from 'react'

const Bill = (props) => {
  return (
    <div className='bill'>
      <h3>Title: {props.title}</h3>
      <p>Introduction date: {props.introductionDate}</p>
      <p>Member in charge: {props.memberInCharge}</p>
      <p>Type: {props.type}</p>
      <p>Bill number: {props.billNumber}</p>
      <p>Summary: {props.summary}</p>
    </div>
  )
}

export default Bill
