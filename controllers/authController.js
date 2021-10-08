const { userExists } = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { Router } = require('express')
const router = Router()

const config = {
  expiresIn: 30
}

const signIn = (model) => {
  const token = jwt.sign({ model }, process.env.TOKEN_KEY, config)

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
  let error, message, data

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
  // Verifica que el usuario exista en la bd
  ({ error, message, data } = await userExists(username, password))
  if (error || !data) return res.status(404).send({ error, message });

  //
  // Genera el token de sesión
  ({ message, data } = signIn({ username, password }))

  return res.status(200).json({ message, data })
})

module.exports = router
