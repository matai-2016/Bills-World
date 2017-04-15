import React, { Component } from 'react'
import { Route } from 'react-router'

import Home from '../components/Home/Home'
import Header from '../components/Header/Header'
import Login from '../components/Login/Login'
import Bills from '../components/Bills/Bills'
import Bill from '../components/Bill/Bill'
import Footer from '../components/Footer/Footer'
import BillPage from '../components/BillPage/BillPage'
import Title from '../components/Title/Title'
import Vote from '../components/Vote/Vote'
import BillInfo from '../components/BillInfo/BillInfo'
import Summary from '../components/Summary/Summary'
import Discussion from '../components/Discussion/Discussion'
import SourceLink from '../components/SourceLink/SourceLink'
import Share from '../components/Share/Share'

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
        <Route path='/:bill_number' component={BillPage} />
        <Route path='/title' component={Title} />
        <Route path='/vote' component={Vote} />
        <Route path='/title' component={Title} />
        <Route path='/billinfo' component={BillInfo} />
        <Route path='/summary' component={Summary} />
        <Route path='/discussion' component={Discussion} />
        <Route path='/sourcelink' component={SourceLink} />
        <Route path='/share' component={Share} />
      </div>
    )
  }
}

export default App
