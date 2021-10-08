const jwt = require('jsonwebtoken')
const { userExists } = require('../models/userModel')

const accessToken = 'x-access-token'

/**
 * Middleware para verificar el token proporcionado.
 *
 * Si el token no es válido, entonces manda datos de error,
 * y no permite entrar a la siguiente función solicitada.
 */
const verifyToken = async (req, res, next) => {
  const token = req.headers[accessToken]

  /**
   * IMPORTANTE: haha!
   *
   * No sé cómo es que un null, es un 'null', pero en string.
   * No pasaba la validación porque es un null, pero viene en tipo string...?
   */
  if (token === 'null' || token === undefined || token === '' || token === false) {
    return res
      .status(403)
      .json({ error: true, message: 'Debes iniciar sesión para acceder al contenido' })
  }

  try {
    const decoded = await jwt.verify(token, process.env.TOKEN_KEY)

    const { username } = decoded

    const { error, message } = await userExists(username)
    if (error) {
      return res
        .status(419)
        .json({ error, message })
    }
  } catch (err) {
    let msg = ''
    const { name, message } = err

    switch (name) {
      case 'TokenExpiredError':
        msg = 'La sesión ha expirado'
        break

      case 'JsonWebTokenError':
        msg = 'Error al procesar el token'
        break

      default:
        msg = 'Ha ocurrido un error'
        break
    }

    return res.status(401).json({ error: true, message: msg || message })
  }

  return next()
}

module.exports = verifyToken
