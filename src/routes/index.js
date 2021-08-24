const { Router } =  require('express')
const router = Router()
const { getPurchaseById, getTotalPurchasesAmount } = require('../controllers/index.controller')

router.get('/purchases/:purchaseId', getPurchaseById)
router.get('/purchases/amounts', getTotalPurchasesAmount)

module.exports = router;