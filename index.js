import './loadEnv.js'
import fastify from 'fastify'
import fastifyFormbody from 'fastify-formbody'
import userRoutes from './routes/userRoutes.js'

const app = fastify({ logger: false })

app.register(fastifyFormbody)

app.register(userRoutes, { prefix: '/users' })

const start = async () => {
  try {
    await app.listen(4000)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
