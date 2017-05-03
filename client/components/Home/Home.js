import React from 'react'

import Header from '../Header/Header'
import About from '../../containers/About/About'
import Bills from '../../containers/Bills/Bills'
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
