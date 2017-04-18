import React from 'react'

import Header from '../Header/Header'
import About from '../About/About'
import Bills from '../Bills/Bills'
import Footer from '../Footer/Footer'

import './home.css'

const Home = () => {
  return (
    <div>
      <Header />
      <About />
      <Bills />
      <Footer />
    </div>
  )
}

export default Home
