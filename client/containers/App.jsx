import React, { Component } from 'react'
import { Route } from 'react-router'

import Home from '../components/Home/Home'
import BillPage from '../components/BillPage/BillPage'

class App extends Component {
  render () {
    return (
      <div>
        <Route exact path='/' component={Home} />
        <Route path='/:bill_number' component={BillPage} />
      </div>
    )
  }
}

export default App
