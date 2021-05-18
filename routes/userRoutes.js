import { getUsers, createUser, deleteUser } from '../controllers/userController.js'

const userRoutes = async (fastify, options) => {
  fastify.get('/', getUsers)
  fastify.post('/', createUser)
  fastify.delete('/:id', deleteUser)
}

export default userRoutes
