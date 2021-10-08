const jwt = require('jsonwebtoken')

/**
 * Middleware para verificar el token proporcionado.
 *
 * Si el token no es válido, entonces manda datos de error,
 * y no permite entrar a la siguiente función solicitada.
 */
const verifyToken = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']

  if (!token) {
    return res.status(403).json({ error: true, message: 'A token is required for authentication' })
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY)

    req.user = decoded
  } catch (err) {
    // console.log('err :>> ', JSON.stringify(err, null, 4))

    let msg = ''
    const { name, message } = err

    switch (name) {
      case 'TokenExpiredError':
        msg = 'La sesión ha expirado'
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
