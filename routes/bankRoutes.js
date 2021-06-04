import { getBanks, createBank, deleteBank } from '../controllers/bankController.js'

const bankRoutes = async (fastify, options) => {
  fastify.get('/', getBanks)
  fastify.post('/', createBank)
  fastify.delete('/:id', deleteBank)
}

export default bankRoutes
