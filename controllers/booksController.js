const { getAllBooks, createBook, searchBook } = require('../models/bookModel')
const { Router } = require('express')
const router = Router()

/**
 * Todos los libros.
 */
router.get('/', async (req, res) => {
  const { error, message, data } = await getAllBooks()

  if (error) return res.status(500).json({ error, message })

  return res.status(200).json({ message, data })
})

/**
 * Crea un nuevo libro
 */
router.post('/', async (req, res) => {
  const { title, year, author } = req.body

  if (
    !title ||
    !year ||
    !author
  ) {
    return res
      .status(422)
      .json({ error: true, message: 'Los datos son requeridos' })
  }

  const { error, message, data } = await createBook({ title, year, author })

  if (error) return res.status(500).json({ error, message })

  return res.status(200).json({ message, data })
})

/**
 * Busca un libro
 */
router.post('/search', async (req, res) => {
  const { keyword } = req.query

  if (!keyword) {
    return res
      .status(422)
      .json({ error: true, message: 'keyword vacío' })
  }

  const { error, message, data } = await searchBook(keyword)
  if (error) {
    return res
      .status(422)
      .json({ error, message })
  }

  return res
    .status(200)
    .json({ message, data })
})

module.exports = router
