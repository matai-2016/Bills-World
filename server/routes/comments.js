const bodyParser = require('body-parser')
const express = require('express')
const comments = require('../lib/comments')

const router = express.Router()
router.use(bodyParser.json())


router.post('/save', (req, res) => {
  comments.saveComment(req.body.clientID, req.body.billNumber, req.body.comment)
      .then(() => comments.getComments(req.body.billNumber))
      .then(function (result) {
        console.log(result)
        res.send(result)
      })
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
})

module.exports = router
