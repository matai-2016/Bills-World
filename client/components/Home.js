import React from 'react'

import Bills from './Bills'
import Login from './Login'
import Header from './Header'
import Footer from './Footer'

const Home = () => {
  return (
    <div>
      <Header />
      <h1>Home Page</h1>
      <Login />
      <Bills />
      <Footer />
    </div>
  )
}

export default Home
