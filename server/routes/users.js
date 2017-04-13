const bodyParser = require('body-parser')
const express = require('express')
const users = require('../lib/users')

const router = express.Router()
router.use(bodyParser.json())

router.get('/', (req, res) => {
  users.getUsers()
    .then(function (result) {
      res.send(result)
    })
})


module.exports = router
