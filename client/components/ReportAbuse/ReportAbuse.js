import React from 'react'
import './reportAbuse.css'

const ReportAbuse = () => {
  return (
    <div className='report-abuse'>
      <h5>If you have any questions or would like to report another user...</h5>
      <a className='email-link' href={'mailto:' + 'billsworldnz@gmail.com'}>Email Bill's World</a>
    </div>
  )
}

export default ReportAbuse
