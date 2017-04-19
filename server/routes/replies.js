const bodyParser = require('body-parser')
const express = require('express')
const replies = require('../lib/replies')
const jwt = require('express-jwt')
const dotenv = require('dotenv')

dotenv.load()

const authenticate = jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  audience: process.env.AUTH0_CLIENT_ID
})

const router = express.Router()
router.use(bodyParser.json())

router.use(authenticate)

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

router.delete('/delete', (req, res) => {
  replies.deleteReply(req.body.user_id, req.body.reply_id)
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

router.put('/edit', (req, res) => {
  replies.editReply(req.body.user_id, req.body.reply_id, req.body.reply)
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
