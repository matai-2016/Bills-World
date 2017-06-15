const app = require('./server')

const PORT = process.env.PORT || 3000

app.listen(PORT, function () {
  console.log('Listening on port', PORT)
})
