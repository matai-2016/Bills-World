import React from 'react'

import Bills from './Bills'
import Login from './Login'
import Header from './Header'

const Home = () => {
  return (
    <div>
      <Header />
      <h1>Home Page</h1>
      <Login />
      <Bills />
    </div>
  )
}

export default Home
