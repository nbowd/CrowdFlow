const fansRouter = require('express').Router()
const mysql = require('../utils/config')
// SQL QUERIES
const getAllQuery = "SELECT * FROM Fans";

// ROUTES
const getAllData = async (response) => {
  await mysql.pool.query(getAllQuery, (rows) => {
    response.json({"rows":rows})
  })
}

fansRouter.get('/', async (request, response) => {
  await getAllData(response)
})


module.exports = fansRouter