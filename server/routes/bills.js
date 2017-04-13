const bodyParser = require('body-parser')
const express = require('express')
const votes = require('../lib/votes')
const bills = require('../lib/bills')

const router = express.Router()
router.use(bodyParser.json())

router.get('/', (req, res) => {
  Promise.all([bills.getBills(), votes.getVotes()])
    .then(([bills, votes]) => {
      const billsToSend = bills.map(bill => {
        return {
          bill_number: bill.bill_number,
          title: bill.title,
          summary: bill.summary,
          type: bill.type,
          member_in_charge: bill.member_in_charge,
          introduction_date: bill.introduction_date,
          submissions_due: bill.submissions_due,
          stage: bill.stage,
          votes_for: votes
            .filter(vote => vote.bill_id === bill.id)
            .reduce(function(total, vote) {
              return vote.voted_for ? total+1 : total
            }, 0),
          votes_against: votes
            .filter(vote => vote.bill_id === bill.id)
            .reduce(function(total, vote) {
              return vote.voted_against ? total+1 : total
            }, 0)
        }
      })
      res.send(billsToSend)
    })
})

// router.post('/', (req, res) => {
//   orders.createOrder(req.body)
//     .then(function (result) {
//       const order = result[0]
//       res.send({
//         message: 'New order created',
//         id: order.id,
//         date: order.date,
//         pickup_time: order.pickup_time,
//         collector_id: order.collector_id,
//         status: order.status
//       })
//     })
// })
//
// router.delete('/:id', (req, res) => {
//   orders.deleteOrder(req.params.id)
//     .then((number) => {
//       res.send({
//         message: 'No coffee for you then',
//         rowsAffected: number
//         })
//     })
// })

module.exports = router
