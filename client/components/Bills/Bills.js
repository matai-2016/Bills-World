import React from 'react'
import Bill from '../Bill/Bill'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getBills } from '../../actions/bills.js'

class Bills extends React.Component {
  componentDidMount () {
    this.props.getBills()
  }

  render () {
    return (
      <div className='container'>
        {this.props.bills.map((bill, i) => {
          return (
            <div className='bill-container' key={i}>
              <Bill
                id={bill.id}
                title={bill.title}
                introductionDate={bill.introduction_date}
                memberInCharge={bill.member_in_charge}
                type={bill.type}
                billNumber={bill.bill_number}
                summary={bill.summary}
              />
              <Link to={`./${bill.bill_number}`}><button className='view-bill-button'>View Bill</button></Link>
            </div>
          )
        })}
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
