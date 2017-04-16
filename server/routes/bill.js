const bodyParser = require('body-parser')
const express = require('express')
const bill = require('../lib/bill')
const comments = require('../lib/comments')
// const votes = require('../lib/votes')

const router = express.Router()
router.use(bodyParser.json())

// get single bill and comments

router.get('/:bill_number', (req, res) => {
  Promise.all([bill.getBill(req.params.bill_number), comments.getComments(req.params.bill_number)])
    .then(([bill, comments]) => {
      const curBill = bill[0]
      const result = {
        bill_number: curBill.bill_number,
        title: curBill.title,
        summary: curBill.summary,
        type: curBill.type,
        member_in_charge: curBill.member_in_charge,
        introduction_date: curBill.introduction_date,
        comments: comments
      }
      res.send(result)
    })
})

module.exports = router
