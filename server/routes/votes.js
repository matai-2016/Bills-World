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
      const bill_number = bill[0].bill_number
      const votesFor = votes
      .filter(vote => vote.bill_number === bill_number)
      .reduce(function (total, vote) {
        return vote.vote > 0 ? total + 1 : total
      }, 0)
      const votesAgainst = votes
      .filter(vote => vote.bill_number === bill_number)
      .reduce(function (total, vote) {
        return vote.vote < 0 ? total + 1 : total
      }, 0)
      const total = votesFor + votesAgainst
      const percentageFor = Number(votesFor / total * 100)
      const roundedFor = percentageFor.toFixed(0)
      const roundedAgainst = 100 - roundedFor
      const result = {
        bill_number: bill_number,
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

router.get('/:billNumber/:userId', (req, res) => {
  votes.getVotesByUserIdAndBillId(req.params.billNumber, req.params.userId)
    .then((vote) => {
      let result = {}
      if (vote === 1) {
        result = {
          bill_number: vote[0].bill_number,
          vote: 1,
          message: 'voted for'
        }
      } else if (vote === 1) {
        result = {
          bill_number: vote[0].bill_number,
          vote: -1,
          message: 'voted against'
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
  const { billNumber, userId, voteType } = req.body
  // get user ID from users table
  return users.getByUserId(userId)
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
