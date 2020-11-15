const mongoose = require('mongoose')

// create a schema
const schema = mongoose.Schema

// new schema
const taskSchema = new schema({
  name : String,
  date : {
    type : Date,
    default : Date.now()
  }
})

// creating mongoose model 
const task = mongoose.model('tasks', taskSchema)

module.exports = task