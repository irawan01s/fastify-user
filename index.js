/* eslint-disable no-undef */
import './loadEnv.js'
import fastify from 'fastify'
import fastifyFormbody from 'fastify-formbody'

console.log(process.env.DB_DIALECT)
import { getUsers, createUser } from './controllers/userController.js'
// const axios = require('axios')
const app = fastify({ logger: false })
app.register(fastifyFormbody)

app.get('/', getUsers)
app.post('/', createUser)


const start = async () => {
  try {
    await app.listen(4000)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()