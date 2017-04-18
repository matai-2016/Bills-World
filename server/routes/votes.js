const bodyParser = require('body-parser')
const express = require('express')
const jwt = require('express-jwt')
const dotenv = require('dotenv')

dotenv.load()

const authenticate = jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  audience: process.env.AUTH0_CLIENT_ID
})

const bill = require('../lib/bill')
const votes = require('../lib/votes')
const users = require('../lib/users')

const router = express.Router()
router.use(bodyParser.json())

// returns votes for and against for singular bill
router.get('/:bill_number', (req, res) => {
  Promise.all([bill.getBill(req.params.bill_number), votes.getVotes()])
    .then(([bill, votes]) => {
      const curBill = bill[0]
      const votesFor = votes
      .filter(vote => vote.bill_number === curBill.bill_number)
      .reduce(function (total, vote) {
        return vote.voted_for ? total + 1 : total
      }, 0)
      const votesAgainst = votes
      .filter(vote => vote.bill_number === curBill.bill_number)
      .reduce(function (total, vote) {
        return vote.voted_against ? total + 1 : total
      }, 0)
      const total = votesFor + votesAgainst
      const percentageFor = Number(votesFor / total * 100)
      const roundedFor = percentageFor.toFixed(0)
      const percentageAgainst = Number(votesAgainst / total) * 100
      const roundedAgainst = percentageAgainst.toFixed(0)
      const result = {
        bill_number: curBill.bill_number,
        votes_for: votesFor,
        votes_against: votesAgainst,
        percentage_for: roundedFor,
        percentage_against: roundedAgainst
      }
      res.send(result)
    })
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
})

router.use(authenticate)

router.get('/:bill_number/:user_id', (req, res) => {
  votes.getVotesByUserIdAndBillId(req.params.bill_number, req.params.user_id)
    .then((vote) => {
      let result = {}
      if (vote.length > 0) {
        result = {
          bill_number: vote[0].bill_number,
          voted_for: vote[0].voted_for,
          voted_against: vote[0].voted_against,
          message: 'already voted'
        }
      } else {
        result = {}
      }
      res.send(result)
    })
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
})

router.post('/', (req, res) => {
  const { billNumber, user_id, voteType } = req.body
  // get user ID from users table
  return users.getByUserId(user_id)
    .then((userResult) => {
      const user = userResult[0]
      return votes.getExistingVote(billNumber, user.user_id)
      .then((voteArr) => {
        if (voteArr.length === 0) {
          return votes.saveUserVote(user.id, billNumber, voteType === 'vote-for', voteType === 'vote-against')
        } else {
          const existingVote = voteArr[0]
          return votes.updateUserVote(existingVote, voteType)
        }
      })
    })
    .then((voteResults) => {
      res.send(voteResults[0])
    })
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
})

module.exports = router
