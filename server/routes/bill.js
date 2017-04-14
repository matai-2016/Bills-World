const bodyParser = require('body-parser')
const express = require('express')
const bill = require('../lib/bill')
const votes = require('../lib/votes')

const router = express.Router()
router.use(bodyParser.json())

// get single bill and vote count
router.get('/:id', (req, res) => {
  Promise.all([bill.getBill(req.params.id), votes.getVotes()])
    .then(([bill, votes]) => {
      console.log('BILL: ', bill[0])
      const curBill = bill[0]
      const result = {
        bill_number: curBill.bill_number,
        title: curBill.title,
        summary: curBill.summary,
        type: curBill.type,
        member_in_charge: curBill.member_in_charge,
        introduction_date: curBill.introduction_date,
        votes_for: votes
        .filter(vote => vote.bill_id === curBill.id)
        .reduce(function (total, vote) {
          return vote.voted_for ? total + 1 : total
        }, 0),
        votes_against: votes
        .filter(vote => vote.bill_id === curBill.id)
        .reduce(function (total, vote) {
          return vote.voted_against ? total + 1 : total
        }, 0)
      }
      res.send(result)
    })
})

router.delete('/:id', (req, res) => {
  bill.deleteBill(req.params.id)
  .then((row) => {
    console.log('Deleted', res.body)
    res.send({
      message: 'Order item deleted',
      rowsAffected: row
    })
  })
})

// router.post('/', (req, res) => {
//   orderItems.createOrderItem(req.body)
//     .then(function (result) {
//       const orderItem = result[0]
//       res.send({
//         message: 'New order item created',
//         id: orderItem.id,
//         type: orderItem.type,
//         order_id: orderItem.order_id,
//         user_id: orderItem.user_id,
//         modifiers: orderItem.modifiers,
//         sugars: orderItem.sugars,
//         size: orderItem.size
//       })
//     })
// })

module.exports = router
