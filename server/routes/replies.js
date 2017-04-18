const bodyParser = require('body-parser')
const express = require('express')
const replies = require('../lib/replies')

const router = express.Router()
router.use(bodyParser.json())

router.post('/save', (req, res) => {
  replies.saveReply(req.body.user_id, req.body.billNumber, req.body.reply, req.body.username, req.body.date, req.body.parentId)
      .then(() => replies.getReplies(req.body.billNumber))
      .then(function (result) {
        res.send(result)
      })
      .catch((err) => {
        if (err) {
          console.error(err.message)
        }
      })
})

module.exports = router
