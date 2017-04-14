import React from 'react'

import Bills from '../Bills/Bills'
import Login from '../Login/Login'
import Header from '../Header/Header'
import Discussion from '../Discussion/Discussion'
import Footer from '../Footer/Footer'

const Home = () => {
  return (
    <div>
      <Header />
      <h1>Home Page</h1>
      <Login />
      <Discussion />
      <Bills />
      <Footer />
    </div>
  )
}

export default Home
