const db = require('../database/knex')

const table = 'books'

async function getAllBooks () {
  try {
    const data = await db(table).select('*')

    return { message: 'Libros obtenidos correctamente', data }
  } catch (error) {
    return { error: true, message: error.message }
  }
}

async function createBook ({ title, year, author }) {
  try {
    const data = await db(table)
      .insert({ title, year, author, createdAt: new Date() })

    return { message: 'Libro agregado correctamente', data }
  } catch (error) {
    return { error: true, message: error.message }
  }
}

async function searchBook (keyword) {
  try {
    const data = await db(table)
      .where('title', 'like', `%${keyword}%`)
      .orWhere('author', 'like', `%${keyword}%`)
      .orWhere('year', 'like', `%${keyword}%`)

    return { message: 'Consulta efectuada correctamente', data }
  } catch (error) {
    return { error: true, message: error.message }
  }
}

module.exports = {
  getAllBooks,
  createBook,
  searchBook
}
