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

async function userExists (username) {
  try {
    const result = await db(table).where('username', username)

    const exists = result && result.length > 0

    const message = exists ? 'ok' : 'Usuario no registrado'

    return { error: !exists, message }
  } catch (error) {
    return { error: true, message: error.message }
  }
}

async function verifyUserAndPassword (username, password) {
  let error, message

  try {
    ({ error, message } = await userExists(username))
    if (error) return { error, message, code: 404 }

    const result = await db(table)
      .where('username', username)
      .where('password', password)

    const valid = result.length > 0

    message = valid ? 'ok' : 'Password incorrecto'

    return { error: !valid, message, code: valid ? 200 : 404 }
  } catch (error) {
    return { error: true, message: error.message, code: 401 }
  }
}

module.exports = {
  getAllUsers,
  createUser,
  userExists,
  verifyUserAndPassword
}
