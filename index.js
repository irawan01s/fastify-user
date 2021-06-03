import './loadEnv.js'
import fastify from 'fastify'
import fastifyFormbody from 'fastify-formbody'
import fastifyCors from 'fastify-cors'
import userRoutes from './routes/userRoutes.js'

const app = fastify({ logger: false })
const port = process.env.APP_PORT || 4000
app.register(fastifyCors)
app.register(fastifyFormbody)

app.register(userRoutes, { prefix: '/users' })

const start = async () => {
  try {
    await app.listen(port)
    console.log(`Api running on port: ${port}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
