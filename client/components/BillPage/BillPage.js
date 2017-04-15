import React from 'react'
import { connect } from 'react-redux'

import { getBillInfo } from '../../actions/billInfo'

import Login from '../Login/Login'
import Header from '../Header/Header'
import Vote from '../Vote/Vote'
import BillInfo from '../BillInfo/BillInfo'
import Footer from '../Footer/Footer'

class BillPage extends React.Component {
  componentDidMount () {
    const billNumber = this.props.match.params.bill_number
    this.props.getBillInfo(billNumber)
  }

  render () {
    return (
      <div className='container'>
        <Header />
        <Login />
        <Vote billNumber={this.props.billInfo.bill_number} />
        <BillInfo
          title={this.props.billInfo.title}
          introductionDate={this.props.billInfo.introduction_date}
          memberInCharge={this.props.billInfo.member_in_charge}
          type={this.props.billInfo.type}
          billNumber={this.props.billInfo.bill_number}
          summary={this.props.billInfo.summary}
        />
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
