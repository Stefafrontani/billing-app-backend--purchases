const { Router } =  require('express')
const router = Router()
const { getPurchaseById, getTotalPurchasesAmount, createPurchase } = require('../controllers/index.controller')

router.post('/purchases', createPurchase)
router.get('/purchases/amounts', getTotalPurchasesAmount)
router.get('/purchases/:purchaseId', getPurchaseById)

module.exports = router;