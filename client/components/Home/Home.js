import React from 'react'

import Bills from '../Bills/Bills'
import Login from '../Login/Login'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

import './home.css'

const Home = () => {
  return (
    <div className='container'>
      <Header />
      <h1>Home Page</h1>
      <Login />
      <Bills />
      <Footer />
    </div>
  )
}

export default Home
