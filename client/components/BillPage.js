import React from 'react'

import Login from './Login'
import Header from './Header'
import Title from './Title'
import Vote from './Vote'
import BillInfo from './BillInfo'
import Summary from './Summary'
import Discussion from './Discussion'
import SourceLink from './SourceLink'
import Share from './Share'
import Footer from './Footer'

const BillPage = () => {
  return (
    <div>
      <Header />
      <Login />
      <Title />
      <Vote />
      <BillInfo />
      <Summary />
      <Discussion />
      <SourceLink />
      <Share />
      <Footer />
    </div>
  )
}

export default BillPage
