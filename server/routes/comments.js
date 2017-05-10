const bodyParser = require('body-parser')
const express = require('express')
const comments = require('../lib/comments')
const jwt = require('express-jwt')
const dotenv = require('dotenv')

dotenv.load()

const authenticate = jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  audience: process.env.AUTH0_CLIENT_ID
})

const router = express.Router()
router.use(bodyParser.json())

router.get('/:bill_number', (req, res) => {
  comments.getComments(req.params.bill_number)
    .then(function (result) {
      res.send(result)
    })
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
})

router.use(authenticate)

router.post('/save', (req, res) => {
  comments.saveComment(req.body.user_id, req.body.billNumber, req.body.comment, req.body.username, req.body.date)
    .then(() => comments.getComments(req.body.billNumber))
    .then(function (result) {
      res.send(result)
    })
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
})

router.post('/save/reply', (req, res) => {
  comments.saveReply(req.body.user_id, req.body.billNumber, req.body.comment, req.body.username, req.body.date, req.body.parentId)
    .then(() => comments.getComments(req.body.billNumber))
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
  comments.editComment(req.body.user_id, req.body.comment_id, req.body.comment)
    .then(() => comments.getComments(req.body.billNumber))
    .then(function (result) {
      res.send(result)
    })
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
})

// router.delete('/delete', (req, res) => {
//   comments.deleteComment(req.body.user_id, req.body.comment_id)
//     .then(() => comments.getComments(req.body.billNumber))
//     .then(function (result) {
//       res.send(result)
//     })
//     .catch((err) => {
//       if (err) {
//         console.error(err.message)
//       }
//     })
// })

router.put('/delete', (req, res) => {
  comments.deleteComment(req.body.user_id, req.body.comment_id, req.body.deleteDate)
    .then(() => comments.getComments(req.body.billNumber))
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
