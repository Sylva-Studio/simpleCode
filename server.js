const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

// express app object
const app = express()

// middleware 
app.use(cors())

// body parses
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// use router
const taskRouter = require('./routes/task')
app.use('/task', taskRouter)

// connect to database
const db = process.env.IMVISUAL_DB
mongoose.connect(db, {useCreateIndex:true, useNewUrlParser:true, useUnifiedTopology:true})

const connection = mongoose.connection
connection.once('open', ()=>{
  console.log('connected to database successfully')
})

// listening to server
const port = process.env.PORT || 5000

app.listen(port, ()=>{
  console.log('listening to port : ' + port)
})