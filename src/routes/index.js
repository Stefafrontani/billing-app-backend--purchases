const { Router } =  require('express')
const router = Router()
const { getPurchaseById, getTotalPurchasesAmount, createPurchase } = require('../controllers/index.controller')

router.get('/purchases/:purchaseId', getPurchaseById)
router.get('/purchases/amounts', getTotalPurchasesAmount)
router.post('/purchases', createPurchase)

module.exports = router;