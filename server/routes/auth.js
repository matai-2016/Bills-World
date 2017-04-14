const bodyParser = require('body-parser')
const express = require('express')
const users = require('../lib/users')

const router = express.Router()
router.use(bodyParser.json())

// router.get('/', (req, res) => {
//   users.getUsers()
//     .then(function (result) {
//       res.send(result)
//     })
// })

// router.post('/', (req, res) => {
//   users.getUsers()
//     .then(function (result) {
//       res.send(result)
//     })
// })

router.get('/:clientID', (req, res) => {
  users.exists(req.params.clientID)
    .then(exists => {
      if (exists) {
        console.log('User exists')
        res.send({message: 'User exists'})
      } else {
        console.log('User does not exist')
        res.send({message: 'User does not exist'})
      }
    })
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
})

router.post('/register',
  register,
  registerFail
)

function register (req, res, next) {
  users.exists(req.body.clientID)
    .then(exists => {
      if (exists) {
        console.log('USER EXISTS')
        next()
        return
      }
      users.createUser(req.body.clientID, req.body.username, req.body.email)
        .then(() => users.getByClientId(req.body.clientID))
        .then(function (result) {
          res.send(result[0])
        })
    })
    .catch((err) => {
      if (err) {
        console.error(err.message)
        next()
      }
    })
}

function registerFail (req, res) {
  res.send({ message: 'Couldn\'t add user' })
}

module.exports = router
