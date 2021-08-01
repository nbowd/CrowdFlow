const employeesRouter = require('express').Router()
const mysql = require('../utils/config')

const getAllQuery = "SELECT * FROM Employees";


// Add new employee
const insertQuery = "INSERT INTO Employees (firstName, lastName, birthdate, startDate, phone, email) VALUES (?, ?, ?, ?, ?, ?)";
// Search by employeeID
const idFilterQuery = "SELECT employeeID, firstName, lastName, birthdate, startDate, phone, email FROM Employees WHERE employeeID=?";

// Search by first name
const fnameFilterQuery = "SELECT employeeID, firstName, lastName, birthdate, startDate, phone, email FROM Employees ORDER BY firstName ASC";

// Search by last name
const lnameFilterQuery = "SELECT employeeID, firstName, lastName, birthdate, startDate, phone, email FROM Employees ORDER BY lastName ASC";

// Employee updated via button
const updateQuery = "UPDATE Employees SET firstName=?, lastName=?, birthdate=?, startDate=?, phone=?, email=? WHERE employeeID =?";

// Employee deleted via button
const deleteQuery = "DELETE FROM Employees WHERE employeeID=?";

// ROUTES
const getAllData = (response) => {
  // err and fields are important for pool.query apparently
  mysql.pool.query(getAllQuery, (err, rows, fields) => {
      if(err){
          next(err);
          return;
        }
      response.json({ "rows": rows })
  })
}

employeesRouter.get('/', (request, response) => {
  getAllData(response)
})

employeesRouter.get('/searchid', (request, response) => {
  mysql.pool.query(idFilterQuery, [request.query.id], (err, rows, fields) => {
      if(err){
          next(err);
          return;
        }
      response.json({ "rows": rows })
  })
})

employeesRouter.get('/first', (request, response) => {
  mysql.pool.query(fnameFilterQuery, (err, rows, fields) => {
      if(err){
          next(err);
          return;
        }
      response.json({ "rows": rows })
  })
})

employeesRouter.get('/last', (request, response) => {
  mysql.pool.query(lnameFilterQuery, (err, rows, fields) => {
      if(err){
          next(err);
          return;
        }
      response.json({ "rows": rows })
  })
})

employeesRouter.post('/', (request,response,next) => {
  // Destructures properties from request body into variables named the same
  var {firstName, lastName, birthdate, startDate, phone, email} = request.body;
  console.log('post');
  mysql.pool.query(insertQuery, [firstName, lastName, birthdate, startDate, phone, email], (err, result) => {
    if(err){
      next(err);
      return;
    }
    getAllData(response);
  });
});

employeesRouter.put('/', (request,response,next) => {
  var {firstName, lastName, birthdate, startDate, phone, email} = request.body;

  mysql.pool.query(updateQuery,
    [firstName, lastName, birthdate, startDate, phone, email, request.query.id],
    (err, result) => {
    if(err){
      next(err);
      return;
    }
    getAllData(response);
  });
});

employeesRouter.delete('/', (request,response,next) => {
  mysql.pool.query(deleteQuery, [request.query.id], (err, result) => {
    if(err){
      next(err);
      return;
    }
    getAllData(response);
  });
});

module.exports = employeesRouter