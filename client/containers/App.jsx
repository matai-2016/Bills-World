import React, { Component } from 'react'
import { Route } from 'react-router'

import Home from '../components/Home'
import Header from '../components/Header'
import Login from '../components/Login'
import Bills from '../components/Bills'
import Bill from '../components/Bill'
import Footer from '../components/Footer'

class App extends Component {
  render () {
    return (
      <div>
        <Route exact path='/' component={Home} />
        <Route path='/header' component={Header} />
        <Route path='/login' component={Login} />
        <Route path='/bills' component={Bills} />
        <Route path='/bill' component={Bill} />
        <Route path='/footer' component={Footer} />
      </div>
    )
  }
}

export default App
