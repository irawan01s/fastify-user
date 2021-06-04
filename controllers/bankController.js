import { v4 as uuidv4 } from 'uuid'
import Bank from '../models/bank.js'

export const getBanks = async (request, reply) => {
  const id = request.query.id

  let whereStatement = null
  if (id) {
    whereStatement = { id }
  }

  try {
    const banks = await Bank.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'createdBy']
      },
      where: whereStatement
    })

    reply.code(200).send({
      status: true,
      message: 'Success',
      data: banks
    })
  } catch (error) {
    return error
  }
}

export const createBank = async (request, reply) => {
  const {
    accountNo,
    name,
    branch,
    createdBy
  } = request.body
  const id = uuidv4()
  const createBy = createdBy || uuidv4()

  const newBank = {
    id,
    accountNo,
    name,
    branch,
    createdBy: createBy
  }
  console.log(newBank)
  try {
    await Bank.create(newBank)

    reply.code(201).send({
      status: true,
      message: 'Succsess',
      data: null
    })
  } catch (error) {
    return error
  }
}

export const deleteBank = async (request, reply) => {
  const id = request.params.id

  try {
    await Bank.destroy({ where: { id } })

    reply.code(200).send({
      status: true,
      message: 'Succsess',
      data: null
    })
  } catch (error) {
    return error
  }
}
