import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import User from '../models/user.js'

const salt = bcrypt.genSaltSync(12)

export const getUsers = async (request, reply) => {
  const id = request.query.id

  let whereStatement = null
  if (id) {
    whereStatement = { id }
  }

  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'createdBy']
      },
      where: whereStatement
    })

    reply.code(200).send({
      status: true,
      message: 'success',
      data: users
    })
  } catch (error) {
    return error
  }
}

export const createUser = async (request, reply) => {
  const {
    name,
    userName,
    email,
    phone,
    password,
    address,
    birthPlace,
    birthDate,
    parentName,
    createdBy
  } = request.body
  const id = uuidv4()
  const hashPassword = await bcrypt.hashSync(password, salt)
  const createBy = createdBy || uuidv4()

  const newUser = {
    id,
    name,
    userName,
    email,
    phone,
    password: hashPassword,
    address,
    birthPlace,
    birthDate,
    parentName,
    createdBy: createBy
  }
  try {
    await User.create(newUser)

    reply.code(201).send({
      status: true,
      message: 'success',
      data: null
    })
  } catch (error) {
    return error
  }
}

export const deleteUser = async (request, reply) => {
  const id = request.params.id

  try {
    await User.destroy({ where: { id } })

    reply.code(200).send({
      status: true,
      message: 'success',
      data: null
    })
  } catch (error) {
    return error
  }
}
