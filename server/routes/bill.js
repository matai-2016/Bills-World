const bodyParser = require('body-parser')
const express = require('express')
const bill = require('../lib/bill')
const votes = require('../lib/votes')

const router = express.Router()
router.use(bodyParser.json())

// get single bill and vote count

router.get('/:id', (req, res) => {
  bill.getBill(req.params.id)
    .then((bill) => {
      console.log('BILL: ', bill[0])
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
