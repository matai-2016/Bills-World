const bodyParser = require('body-parser')
const express = require('express')
const bill = require('../lib/bill')
const comments = require('../lib/comments')
const replies = require('../lib/replies')
// const votes = require('../lib/votes')

const router = express.Router()
router.use(bodyParser.json())

// get single bill and comments

router.get('/:bill_number', (req, res) => {
  Promise.all([bill.getBill(req.params.bill_number), comments.getComments(req.params.bill_number), replies.getReplies(req.params.bill_number)])
    .then(([bill, comments, replies]) => {
      const nestedComments = []
      const parentComments = comments.filter(comment => comment.parent_id == null)
      parentComments.map(parentComment => {
        const commentWithReplies = {}
        const replies = comments.filter(comment => comment.parent_id === parentComment.id)
        commentWithReplies.comment = parentComment
        commentWithReplies.replies = replies
        nestedComments.push(commentWithReplies)
      })
      const currentBill = bill[0]
      const result = {
        bill_number: currentBill.bill_number,
        title: currentBill.title,
        summary: currentBill.summary,
        type: currentBill.type,
        member_in_charge: currentBill.member_in_charge,
        introduction_date: currentBill.introduction_date,
        comments: comments,
        replies: replies,
        nestedComments: nestedComments
      }
      res.send(result)
    })
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
})

module.exports = router
