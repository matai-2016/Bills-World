import React from 'react'
import { connect } from 'react-redux'

import { getBillInfo } from '../../actions/billInfo'

import Header from '../../components/Header/Header'
import BillTitle from '../../components/BillTitle/BillTitle'
import Vote from '../Vote/Vote'
import BillInfo from '../../components/BillInfo/BillInfo'
import Discussion from '../Discussion/Discussion'
import Footer from '../../components/Footer/Footer'
import './billpage.css'

class BillPage extends React.Component {
  componentDidMount () {
    const billNumber = this.props.match.params.bill_number
    this.props.getBillInfo(billNumber)
  }
  render () {
    if (!this.props.billInfo.bill_number) {
      return (<div>Loading...</div>)
    }
    return (
      <div>
        <Header />
        <BillTitle
          title={this.props.billInfo.title}
        />
        <div className='container'>
          <BillInfo
            title={this.props.billInfo.title}
            introductionDate={this.props.billInfo.introduction_date}
            memberInCharge={this.props.billInfo.member_in_charge}
            type={this.props.billInfo.type}
            billNumber={this.props.billInfo.bill_number}
            summary={this.props.billInfo.summary}
          />
          <Vote billNumber={this.props.match.params.bill_number} />
          <Discussion
            billNumber={this.props.billInfo.bill_number}
            comments={this.props.billInfo.comments}
            replies={this.props.billInfo.replies}
            getBillInfo={this.props.getBillInfo}
            />
        </div>
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
