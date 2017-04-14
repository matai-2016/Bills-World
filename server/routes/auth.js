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
        console.log('User Exists')
        res.send({ message: 'User Exists'})
      } else {
        console.log('User Does Not Exist')
        res.send({ message: 'User Does Not Exist'})
      }
    })
})

// router.post('/register',
//   register,
//   registerFail
// )
//
// function register (req, res, next) {
//   users.exists(req.body.profile.clientID)
//     .then(exists => {
//       if (exists) {
//         res.send({ message: 'User Exists'})
//       }
//
//       users.createUser(req.body.profile.clientID, req.body.profile.username, req.body.profile.email)
//         .then(() => users.getByClientId(req.body.profile.clientID))
//         .then((users) => {
//           const user = users[0]
//           req.login(user, (err) => {
//             if (err) {
//               return res.send({ message: err })
//             }
//             res.send({
//               message: 'Authentication Successful',
//               authenticated: true,
//               id: user.id,
//               name: user.name,
//               email: user.email,
//               phone: user.phone
//             })
//           })
//         })
//     })
//     .catch((err) => {
//       if (err) {
//         console.error(err.message)
//         return
//       }
//       next()
//     })
// }
//
// function registerFail (req, res) {
//   res.send({ message: 'Couldnt add user' })
// }

module.exports = router
