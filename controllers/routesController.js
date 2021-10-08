const { Router } = require('express')
const router = Router()
const routes = require('../routes.json')

router.get('/', (req, res, next) => res.json(routes))

module.exports = router
