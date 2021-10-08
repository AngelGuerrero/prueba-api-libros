const db = require('../database/knex')

const table = 'users'

async function getAllUsers () {
  try {
    const data = await db(table).select('*')

    return { message: 'Usuarios obtenidos correctamente', data }
  } catch (error) {
    return { error: true, message: error.message }
  }
}

async function createUser ({ username, password }) {
  try {
    const data = await db(table).insert({
      username,
      password, // TODO: encriptar
      createdAt: new Date()
    })

    return { message: 'Usuario registrado correctamente', data }
  } catch (error) {
    return { error: true, message: error.message }
  }
}

async function userExists (username, password) {
  try {
    const result = await db(table)
      .where('username', username)
      .where('password', password)

    const exists = result && result.length > 0

    const message = exists ? 'ok' : 'Usuario no encontrado'

    return { message, data: exists }
  } catch (error) {
    return { error: true, message: error.message }
  }
}

module.exports = {
  getAllUsers,
  createUser,
  userExists
}
