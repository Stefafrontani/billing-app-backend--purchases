const { Router } =  require('express')
const router = Router()
const { getTotalPurchasesAmount } = require('../controllers/index.controller')

router.get('/purchases/amounts', getTotalPurchasesAmount)

module.exports = router;