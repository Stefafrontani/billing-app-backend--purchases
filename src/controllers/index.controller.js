const { Pool } = require('pg')
const axios = require('axios');

// dotenv package - use .env file
require('dotenv').config({ path: './src/database/.env' })

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB
})

const getPurchaseById = async (req, res) => {
  console.log('getPurchaseById')
  const purchaseId = req.params.purchaseId;
  try {
    const response = await pool.query('SELECT * FROM purchases WHERE id = $1', [purchaseId])
    const purchaseFound = response.rows[0]
    res.status(200).send(purchaseFound)
  } catch(e) {
    console.log(`Could not find a purchase with id ${purchaseId}`)
    throw new Error(`No purchase with id ${purchaseId} found`);
  }
}

const getTotalPurchasesAmount = async (req, res) => {
  console.log('getTotalDebt')
  try {
    const response = await pool.query('SELECT SUM (amount) AS total FROM purchases;');
    res.status(200).send({ totalDebt: response.rows[0].total })
  } catch(e) {
    console.log('Could not sum total debts amount')
    throw new Error('Could not sum total debts amount');
  }
}

const createPayment = async ({ purchaseId, expirationDate, amount, feeNumber }) => {
  const newPayment = await axios.post(
    'http://payments:4001/payments',
    {
      purchaseId,
      expirationDate,
      amount,
      feeNumber
    }
  ).then(res => {
    return res
  })

  return newPayment.data
}

const createPurchase = async (req, res) => {
  console.log('createPurchase');
  const { description, boughtAt, amount, fees } = req.body;
  
  try {
    const purchaseCreatedResponse = await pool.query('INSERT INTO purchases (description, "boughtAt", amount, fees) VALUES ($1, $2, $3, $4) RETURNING *;', [description, boughtAt, amount, fees])
    const purchaseCreated = purchaseCreatedResponse.rows[0]
    const { id: newPurchaseId, boughtAt: newPurchaseBoughtAt, amount: newPurchaseAmount, fees: newPurchaseFees } = purchaseCreated;
    
    const newPaymentsCreated = []
    for (let i = 0; i < purchaseCreated.fees; i++) {
      const boughtAtDate = new Date(newPurchaseBoughtAt)
      // If bought on march, the first iteration should add (0 + 1) to make the first expirationpayment date in abril
      const expirationDate = boughtAtDate.setMonth(boughtAtDate.getMonth()+ (i + 1))
      const expirationDateFormatted = new Date(expirationDate).toISOString()
      
      const newPaymentData = {
        purchaseId: newPurchaseId,
        expirationDate: expirationDateFormatted,
        amount: newPurchaseAmount / fees,
        feeNumber: i + 1
      }
      
      const newPaymentCreated = await createPayment(newPaymentData);
      newPaymentsCreated.push(newPaymentCreated)
    }

    res.status(200).send({
      purchase: purchaseCreated,
      payments: newPaymentsCreated
    })
  } catch(e) {
    console.log('Could not create purchase')
    throw new Error(e);
  }
}

module.exports = {
  getPurchaseById,
  getTotalPurchasesAmount,
  createPurchase
}