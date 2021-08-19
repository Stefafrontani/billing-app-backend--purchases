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

const getExpenditures = async (req, res) => {
  console.log('getExpenditures')
  const response = await pool.query('SELECT * FROM expenditures');
  res.status(200).send(response.rows)
}

const getExpenditureById = async (req, res) => {
  console.log('getExpenditureById')
  const expenditureId = req.params.id;
  const response = await pool.query('SELECT * FROM expenditures WHERE id = $1', [expenditureId])
  res.status(200).json(response.rows)
}

const createExpenditure = async (req, res) => {
  console.log('createExpenditure')
  const { name, email } = req.body;
  const response = await pool.query('INSERT INTO expenditures (name, email) VALUES ($1, $2)', [name, email])
  res.status(200).json(response.rows)
}
  
const updateExpenditure = async (req, res) => {
  console.log('updateExpenditure')
  const expenditureId = req.params.id;
  const { name, email } = req.body;
  const response = await pool.query('UPDATE expenditures SET name = $1, email = $2 WHERE id = $3', [name, email, expenditureId])
  res.status(200).json(response.rows)
}

const deleteExpenditure = async (req, res) => {
  console.log('deleteExpenditure')
  const expenditureId = req.params.id;
  const response = await pool.query('DELETE FROM expenditures WHERE id = $1', [expenditureId])
  res.status(200).json(response.rows)
}

module.exports = {
  getExpenditures,
  getExpenditureById,
  createExpenditure,
  deleteExpenditure,
  updateExpenditure
}