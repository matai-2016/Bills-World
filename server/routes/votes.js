const bodyParser = require('body-parser')
const express = require('express')
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

router.get('/:bill_number/:clientID', (req, res) => {
  votes.getVotesByClientIdAndBillId(req.params.bill_number, req.params.clientID)
    .then((vote) => {
      let result = {}
      if (vote.length > 0) {
        result = {
          bill_number: vote[0].bill_number,
          votes_for: vote[0].voted_for,
          votes_against: vote[0].voted_against,
          message: 'already voted'
        }
      } else {
        result = {
          votes_for: 0,
          votes_against: 0
        }
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
  const { billNumber, clientID, voteType } = req.body
  // get client ID from users table
  users.getByClientId(clientID)
    .then((userResult) => {
      const user = userResult[0]
      let finalResult = {}
      // check if there is an existing vote
      votes.getVotesByClientIdAndBillId(billNumber, user.client_id)
        .then((vote) => {
          if (vote.length === 0) {
            if (voteType === 'vote-for') {
              votes.saveUserVote(user.id, billNumber, 1, 0)
              .then(finalResult = {bill_number: billNumber, votes_for: 1, votes_against: 0, message: 'submitted vote'})
            } else {
              votes.saveUserVote(user.id, billNumber, 0, 1)
              .then(finalResult = {bill_number: billNumber, votes_for: 0, votes_against: 1, message: 'submitted vote'})
            }
          } else {
            let existingVote = vote[0]
            if (voteType === 'vote-for') {
              votes.updateUserVote(existingVote.user_id, billNumber, !existingVote.voted_for, 0)
                .then(finalResult = {bill_number: billNumber, votes_for: !existingVote.voted_for, votes_against: 0, message: 'updated vote'})
            } else {
              votes.updateUserVote(existingVote.user_id, billNumber, 0, !existingVote.voted_against)
                .then(finalResult = {bill_number: billNumber, votes_for: 0, votes_against: !existingVote.voted_against, message: 'updated vote'})
            }
            res.send(finalResult)
          }
        })
    })
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
})

module.exports = router
