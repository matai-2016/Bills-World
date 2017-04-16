import React from 'react'

import Bills from '../Bills/Bills'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

import './home.css'

const Home = () => {
  return (
    <div>
      <Header />
      <div className='container'>
        <h1>Home Page</h1>
        <Bills />
      </div>
      <Footer />
    </div>
  )
}

export default Home
