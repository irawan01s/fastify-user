import './loadEnv.js'
// import dotenv from 'dotenv'
// dotenv.config()
import fastify from 'fastify'
import fastifyFormbody from 'fastify-formbody'
import fastifyCors from 'fastify-cors'
import userRoutes from './routes/userRoutes.js'
import bankRoutes from './routes/bankRoutes.js'

const app = fastify({ logger: false })
const port = process.env.PORT || 3000

console.log(`Port ${process.env.PORT}`)

app.register(fastifyCors, {
  origin: '*',
  methods: 'GET,PATCH,POST,DELETE,OPTIONS'
})

app.register(fastifyFormbody)

app.get('/', (request, reply) => {
  reply.code(200).send({
    status: true,
    message: 'Success Fastify'
  })
})

app.register(userRoutes, { prefix: '/users' })
app.register(bankRoutes, { prefix: '/banks' })

const start = async () => {
  try {
    await app.listen(port)
    console.log(`Server is running on port ${process.env.PORT}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
