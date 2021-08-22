const { Pool } = require('pg')

// dotenv package - use .env file
require('dotenv').config({ path: './src/database/.env' })

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB
})

const getPurchases = async (req, res) => {
  console.log('getPurchases')
  const response = await pool.query('SELECT * FROM purchases');
  res.status(200).send(response.rows)
}

const getPurchaseById = async (req, res) => {
  console.log('getPurchaseById')
  const purchaseId = req.params.id;
  const response = await pool.query('SELECT * FROM purchases WHERE id = $1', [purchaseId])
  res.status(200).json(response.rows)
}

const createPurchase = async (req, res) => {
  console.log('createPurchase')
  const { name, email } = req.body;
  const response = await pool.query('INSERT INTO purchases (name, email) VALUES ($1, $2)', [name, email])
  res.status(200).json(response.rows)
}
  
const updatePurchase = async (req, res) => {
  console.log('updatePurchase')
  const purchaseId = req.params.id;
  const { name, email } = req.body;
  const response = await pool.query('UPDATE purchases SET name = $1, email = $2 WHERE id = $3', [name, email, purchaseId])
  res.status(200).json(response.rows)
}

const deletePurchase = async (req, res) => {
  console.log('deletePurchase')
  const purchaseId = req.params.id;
  const response = await pool.query('DELETE FROM purchases WHERE id = $1', [purchaseId])
  res.status(200).json(response.rows)
}

module.exports = {
  getPurchases,
  getPurchaseById,
  createPurchase,
  deletePurchase,
  updatePurchase
}