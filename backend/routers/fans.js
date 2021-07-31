const fansRouter = require('express').Router()
const mysql = require('../utils/config')
// SQL QUERIES
const getAllQuery = "SELECT * FROM Fans";

// ROUTES
const getAllData = (response) => {
  // err and fields are important for pool.query apparently
  mysql.pool.query(getAllQuery, (err, rows, fields) => {
    response.json({"rows":rows})
  })
}

fansRouter.get('/', (request, response) => {
    getAllData(response)
})


module.exports = fansRouter