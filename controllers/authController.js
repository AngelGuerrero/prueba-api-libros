const { verifyUserAndPassword } = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { Router } = require('express')
const router = Router()

const config = {
  algorithm: 'HS256',
  expiresIn: '1h'
}

const signIn = (user) => {
  const token = jwt.sign(user, process.env.TOKEN_KEY, config)

  return { message: 'Token generado correctamente', data: token }
}

/**
 * Inicia sesión, validando los datos del usuario.
 *
 * Si las validaciones son correctas, se genera un token
 * de inicio de sesión que se debe usar en todas las rutas
 * que se requiera autenticación.
 */
router.post('/login', async (req, res) => {
  let error, message, data, code

  const { username, password } = req.body

  if (!username) {
    return res
      .status(422)
      .json({ error: true, message: 'El username de usuario es requerido.' })
  }
  if (!password) {
    return res
      .status(422)
      .json({ error: true, message: 'El password es requerido.' })
  }

  //
  // Verifica el usuario y password del usuario en la base de datos.
  ({ error, message, code } = await verifyUserAndPassword(username, password))
  if (error) return res.status(code).send({ error, message });

  //
  // Genera el token de sesión
  ({ message, data } = signIn({ username, password }))

  return res.status(200).json({ message, data })
})

module.exports = router
