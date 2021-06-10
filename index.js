import './loadEnv.js'
import fastify from 'fastify'
import fastifyFormbody from 'fastify-formbody'
import fastifyCors from 'fastify-cors'
import userRoutes from './routes/userRoutes.js'
import bankRoutes from './routes/bankRoutes.js'

const app = fastify({ logger: false })
const port = process.env.PORT || 3000

app.register(fastifyCors, {
  origin: '*',
  methods: 'GET,PATCH,POST,DELETE,OPTIONS'
})

app.register(fastifyFormbody)

app.get('/', (request, reply) => {
  reply.code(200).send({
    status: true,
    message: 'Success'
  })
})

app.register(userRoutes, { prefix: '/users' })
app.register(bankRoutes, { prefix: '/banks' })

const start = async () => {
  try {
    await app.listen(port)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
