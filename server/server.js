const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public')))

//routes
const authRoutes = require('./routes/auth')
const billsRoutes = require('./routes/bills')
const billRoutes = require('./routes/bill')

app.use('/auth', authRoutes)
app.use('/bills', billsRoutes)
app.use('/bill', billRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
})


module.exports = app
