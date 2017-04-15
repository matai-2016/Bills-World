const bodyParser = require('body-parser')
const express = require('express')
const bill = require('../lib/bill')
// const votes = require('../lib/votes')

const router = express.Router()
router.use(bodyParser.json())

// get single bill and vote count

router.get('/:bill_number', (req, res) => {
  bill.getBill(req.params.bill_number)
    .then((bill) => {
      const curBill = bill[0]
      const result = {
        bill_number: curBill.bill_number,
        title: curBill.title,
        summary: curBill.summary,
        type: curBill.type,
        member_in_charge: curBill.member_in_charge,
        introduction_date: curBill.introduction_date
      }
      res.send(result)
    })
})

module.exports = router
