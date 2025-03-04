const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const bootstrap = require('./config/bootstrap')
const router = require('./config/routes')
const errorHandler = require('./api/middlewares/errorHandler')

const { HOST, PORT, DB } = process.env
const app = express()

mongoose.connect(DB)

app.use(cors({
    origin: '*', 
    credentials: false, 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}))

app.use(bodyParser.urlencoded({ extended: false, limit: '60mb' }))
app.use(bodyParser.json({ limit: '60mb' }))

app.use('/api/v1', router)

app.use(errorHandler)
  
app.listen(PORT)
console.log('HOST: ', HOST, PORT)
bootstrap(HOST, PORT)
