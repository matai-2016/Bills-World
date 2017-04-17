import React from 'react'
import moment from 'moment'

import './billInfo.css'

const BillInfo = (props) => {
  return (
    <div className='bill-info-container'>
      <p className='intro-date'>Introduced: {moment(props.introductionDate).format('D MMM YYYY')}</p>
      <p className='summary'>{props.summary}</p>
      <div className='bill-details'>
        <div className='detail-container'>
          <p>Bill Number: {props.billNumber}</p>
        </div>
        <div className='detail-container'>
          <p>Type: {props.type}</p>
        </div>
        <div className='detail-container'>
          <p id='member-in-charge'><img className='member-img' src='/img/member.png' />{props.memberInCharge}</p>
        </div>
      </div>
      <a className='parliament-link' href='https://www.parliament.nz/en/pb/bills-and-laws/proposed-members-bills/'>View on Parliament Website</a>
    </div>
  )
}

export default BillInfo
