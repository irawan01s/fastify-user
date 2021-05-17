import {v4 as uuidv4} from 'uuid'
import bcrypt from 'bcrypt'
import User from '../models/user.js'

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
  
    reply.header('Content-Type', 'application/json; charset=utf-8').send({
      message: 'Success',
      data: users
    })
  } catch (error) {
    return error
  }
}

export const createUser = async (request, reply) => {
  const { name, userName, email, phone, password, address, birthPlace, birthDate, parentName, createdBy } = request.body
  const id = uuidv4()
  const hashPassword = await bcrypt.hash(password, 12)
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
    const createdUser = await User.create(newUser)
  
    reply.code(201).send({
      code: 200,
      message: 'Succsess',
      data: createdUser
    })    
  } catch (error) {
    return error
  }
}