import React, { Component } from 'react'
import { Route } from 'react-router'

import Home from '../components/Home'
import Header from '../components/Header'
import Login from '../components/Login'
import Bills from '../components/Bills'
import Bill from '../components/Bill'
import Footer from '../components/Footer'
import BillPage from '../components/BillPage'
import Title from '../components/Title'
import Vote from '../components/Vote'
import BillInfo from '../components/BillInfo'
import Summary from '../components/Summary'
import Discussion from '../components/Discussion'
import SourceLink from '../components/SourceLink'
import Share from '../components/Share'

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
        <Route path='/billid' component={BillPage} />
        <Route path='/title' component={Title} />
        <Route path='/vote' component={Vote} />
        <Route path='/title' component={Title} />
        <Route path='/billinfo' component={BillInfo} />
        <Route path='/summary' component={Summary} />
        <Route path='/discussion' component={Discussion} />
        <Route path='/sourcelink' component={SourceLink} />
      </div>
    )
  }
}

export default App
