const { Router } =  require('express')
const router = Router()
const { getPurchases, getPurchaseById, createPurchase, updatePurchase, deletePurchase } = require('../controllers/index.controller')

router.get('/purchases', getPurchases)
router.get('/purchases/:id', getPurchaseById)
router.post('/purchases', createPurchase)
router.delete('/purchases/:id', deletePurchase)
router.put('/purchases/:id', updatePurchase)

module.exports = router;