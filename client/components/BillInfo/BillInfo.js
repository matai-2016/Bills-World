import React from 'react'
import moment from 'moment'

import Share from '../Share/Share'

import './billinfo.css'

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
        <a className='parliament-link' href='https://www.parliament.nz/en/pb/bills-and-laws/bills-proposed-laws/'>View on Parliament Website</a>
        <Share
          billNumber={props.billNumber}
          title={props.title}
          summary={props.summary}
        />
      </div>
    </div>
  )
}

export default BillInfo
