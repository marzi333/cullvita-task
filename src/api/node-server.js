const express = require('express')
const { json } = require('express')
const _ = require('lodash')
const cors = require('cors')


const app = express()
app.use(cors())

const tasks = [
  {
    id: 1,
    title: 'play pool',
    description: 'play it everyday for practice'
  },
  {
    id: 2,
    title: 'study hard',
    description: 'study smart not hard'
  },
  {
    id: 3,
    title: 'pet the dog',
    description: 'dogs are nice'
  }
]

app.get('/tasks', (req, res) => {
  res.send(tasks)
})

app.get('/task/:id', (req, res) => {
  if (req.params.id > tasks.length) return res.status(400).send('Task not found!')
  res.send(tasks[req.params.id - 1])
})

//searching by title
app.get('/tasks/searchTitle', (req, res) => {
    const searchKey = req.body.searchKey
    const results = tasks.filter(t => t.title.includes(searchKey))
    res.send(results)
})

//searching by description
app.get('/tasks/searchDescription', (req, res) => {
    const searchKey = req.body.searchKey
    const results = tasks.filter(t => t.description.includes(searchKey))
    res.send(results)
})

//adding a task
app.post('/tasks', (req, res) => {
    console.log("start",req.body)
    const newTask = req.body
    // if (!newTask.title || !newTask.description) return res.status(400).send('Missing data')
    tasks.push({
        id: tasks.length + 1,
        title: newTask.title,
        description: newTask.description
    })
    res.send(tasks[tasks.length - 1])
})

//editing a task
app.patch('/task/:id', (req, res) => {
  const id = req.params.id
  if (id > tasks.length) return res.status(400).send('Task not found!')
  _.assign(tasks[id - 1], _.pick(req.body, ['title', 'description']))
  res.send(tasks[id - 1])
})

app.listen(5000, () => {
  console.log('App listening on localhost:5000')
})
