const { Router } = require('express')
const router = Router()
const { createUser, userExists, getAllUsers } = require('../models/userModel')

/**
 * Todos los usuarios.
 */
router.get('/', async (req, res) => {
  const { error, message, data } = await getAllUsers()

  if (error) return res.status(500).json({ error, message })

  return res.status(200).json({ message: 'Usuarios obtenidos correctamente', data })
})

/**
 * Crea un usuario.
 */
router.post('/', async (req, res) => {
  const { username, password } = req.body

  //
  // Aplica las validaciones
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
  // Verifica que el usuario exista, si existe, manda un error
  const { data } = userExists({ username, password })
  if (data) {
    return res
      .status(409)
      .json({ error: true, message: 'Este nombre de usuario ya está registrado' })
  }

  //
  // Crea el usuario
  const { error, message } = await createUser({ username, password })
  if (error) {
    return res
      .status(500)
      .json({ error, message })
  }

  return res
    .status(201)
    .json({ message: 'Usuario correctamente registrado' })
})

module.exports = router
