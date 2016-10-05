import express from 'express'
import {queries, commands} from '../database'

const router = new express.Router()

router.get('/', (request, response, next) => {
  response.send("home Page")
})

router.get('/user', (request, response, next) => {
  queries.getUsers()
    .then(user => {
      response.json(user)
    })
})

router.post('/user', (request, response, next) => {
  const att = request.body
  commands.createUser(att)
    .then(user => {
      response.json(user)
    })
})

router.get('/user/:id', (request, response, next) => {
  const userId = request.params.id
  queries.getUserById(userId)
    .then(user => {
      if (user){
        response.json(user)
      }else{
        response.status(404).json(null)
      }
    })
})


export default router


