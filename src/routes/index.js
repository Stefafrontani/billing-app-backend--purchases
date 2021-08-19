const { Router } =  require('express')
const router = Router()
const { getExpenditures, getExpenditureById, createExpenditure, updateExpenditure, deleteExpenditure } = require('../controllers/index.controller')

router.get('/expenditures', getExpenditures)
router.get('/expenditures/:id', getExpenditureById)
router.post('/expenditures', createExpenditure)
router.delete('/expenditures/:id', deleteExpenditure)
router.put('/expenditures/:id', updateExpenditure)

module.exports = router;