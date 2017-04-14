import React from 'react'

import Login from '../Login/Login'
import Header from '../Header/Header'
import Title from '../Title/Title'
import Vote from '../Vote/Vote'
import BillInfo from '../BillInfo/BillInfo'
import Summary from '../Summary/Summary'
import Discussion from '../Discussion/Discussion'
import SourceLink from '../SourceLink/SourceLink'
import Share from '../Share/Share'
import Footer from '../Footer/Footer'

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
