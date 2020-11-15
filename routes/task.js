const express = require('express')
const Task = require('../model/task')

// express router object
const router = express.Router()

// get router for fetching all the item in the db
router.get('/', async(req, res) => {
  try {
    const tasks = await Task.find()
    res.json(tasks)
  } catch (error) {
    res.status(400).json({msg: error})
  }
})

router.get('/:id', async (req, res) => {
  try {
    const fetch_id = await Task.findById(req.params.id)
    res.json(fetch_id)
  } catch (error) {
    res.status(400).json({msg: error})
  }
})

// post router for adding a new task
router.post('/add', async(req, res) => {
  const name = req.body.name
  try {
    const add_task = await new Task({name})
    const saved = await add_task.save()
    res.json({msg:'Task added sucessfully'})
  } catch (error) {
    res.status(400).json({msg: error})
  }
})

// post router for editing a task
router.post('/edit/:id', async(req, res) => {
  try {
    const fetch_id = await Task.findById(req.params.id)
    fetch_id.name = req.body.name
    
    const saved = await fetch_id.save()
    res.json(saved)
  } catch (error) {
    res.status(400).json({msg: error})
  }
})


// delete router for deleting a task
router.delete('/:id', async(req, res) => {
  try {
    const fetch_id = await Task.findByIdAndDelete(req.params.id)
    res.json({msg: 'Task deleted'})
  } catch (error) {
    res.status(400).json({msg: error})
  }
})

module.exports = router