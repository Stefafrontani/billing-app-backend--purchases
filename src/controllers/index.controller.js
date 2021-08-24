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

const getTotalPurchasesAmount = async (req, res) => {
  console.log('getTotalDebt')
  try {
    const response = await pool.query('SELECT SUM (amount) AS total FROM purchases;');
    res.status(200).send({ totalDebt: response.rows[0].total })
  } catch(e) {
    console.log('could not sum total debts amount')
    throw new Error('No sum');
  }
}

module.exports = {
  getTotalPurchasesAmount
}