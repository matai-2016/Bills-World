import React from 'react'
import Bill from '../../components/Bill/Bill'

import { connect } from 'react-redux'

import './bills.css'

import { getBills } from '../../actions/bills.js'

class Bills extends React.Component {
  componentDidMount () {
    this.props.getBills()
  }

  render () {
    return (
      <div className='bills-background'>
        <div className='container'>
          <h1>Current Bills</h1>
          {this.props.bills.map((bill, i) => {
            return (
              <div className='col-md-4 col-sm-6 col-xs-12 bill-border' key={i}>
                <Bill
                  id={bill.id}
                  title={bill.title}
                  introductionDate={bill.introduction_date}
                  memberInCharge={bill.member_in_charge}
                  type={bill.type}
                  billNumber={bill.bill_number}
                  summary={bill.summary}
                  comments={bill.comments}
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    bills: state.bills
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBills: () => {
      dispatch(getBills())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bills)
