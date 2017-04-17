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

router.get('/:user_id', (req, res) => {
  users.exists(req.params.user_id)
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
  users.exists(req.body.user_id)
    .then(exists => {
      if (exists) {
        console.log('USER EXISTS')
        next()
        return
      }
      users.createUser(req.body.user_id, req.body.username, req.body.email)
        .then(() => users.getByUserId(req.body.user_id))
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
