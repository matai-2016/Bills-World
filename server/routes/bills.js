const bodyParser = require('body-parser')
const express = require('express')
const votes = require('../lib/votes')
const comments = require('../lib/comments')
const bills = require('../lib/bills')

const router = express.Router()
router.use(bodyParser.json())

// gets all bills and their vote count
router.get('/', (req, res) => {
  Promise.all([bills.getBills(), votes.getVotes(), comments.getAllComments()])
    .then(([bills, votes, allComments]) => {
      const billsToSend = bills.map(bill => {
        return {
          bill_number: bill.bill_number,
          title: bill.title,
          summary: bill.summary,
          type: bill.type,
          member_in_charge: bill.member_in_charge,
          introduction_date: bill.introduction_date,
          votes_for: votes
            .filter(vote => vote.bill_number === bill.bill_number)
            .reduce(function (total, vote) {
              return vote.voted_for ? total + 1 : total
            }, 0),
          votes_against: votes
            .filter(vote => vote.bill_number === bill.bill_number)
            .reduce(function (total, vote) {
              return vote.voted_against ? total + 1 : total
            }, 0),
          comments: allComments.filter(comments => comments.bill_number === bill.bill_number)
        }
      })
      res.send(billsToSend)
    })
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
})

module.exports = router

const comments = [{id: 1, comment: comment1, parent_id: null}, {id: 2, comment:comment2, parent_id: null}, {id:3, comment: reply1, parent_id: 1}, {id:4, comment: reply2, parent_id: 2}]

const parentComments = comments.filter(comment => comment.parent_id == null)
const nestedComments = []

parentComments.map(parentComment => {
  const nestedComment = {}
  nestedComment.comment = parentComment
  const replies = comments.filter(comment => comment.parent_id === parentComment.id)
  nestedComment.replies = replies
  nestedComments.push(nestedComment)
})
