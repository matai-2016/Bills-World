import React from 'react'
import { connect } from 'react-redux'

import { getBillInfo } from '../../actions/billInfo'

import Login from '../Login/Login'
import Header from '../Header/Header'
import BillInfo from '../BillInfo/BillInfo'
import Discussion from '../Discussion/Discussion'
import Footer from '../Footer/Footer'

import './billPage.css'

class BillPage extends React.Component {
  componentDidMount () {
    const billNumber = this.props.match.params.bill_number
    this.props.getBillInfo(billNumber)
  }
  render () {
    return (
      <div className='container bill-info-container'>
        <Header />
        <Login />
        <BillInfo
          title={this.props.billInfo.title}
          introductionDate={this.props.billInfo.introduction_date}
          memberInCharge={this.props.billInfo.member_in_charge}
          type={this.props.billInfo.type}
          billNumber={this.props.billInfo.bill_number}
          summary={this.props.billInfo.summary}
        />
        <Discussion />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    billInfo: state.billInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBillInfo: (billNumber) => {
      dispatch(getBillInfo(billNumber))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillPage)
