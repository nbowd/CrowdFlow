const employeesJobTitlesRouter = require('express').Router()
const mysql = require('../utils/config')

// Populate page table
const getAllQuery = "SELECT * FROM Employee_job_titles";

// Add entry
const insertQuery = "INSERT INTO Employee_job_titles (jobID, employeeID) VALUES (?, ?)";

// Select entry based on jobID
const jobFilterQuery = "SELECT jobID, employeeID FROM Employee_job_titles WHERE jobID=?";

// Select entry based on employeeID
const employeeFilterQuery = "SELECT jobID, employeeID FROM Employee_job_titles WHERE employeeID=?";

// Delete entry from button
const deleteQuery = "DELETE FROM Employee_job_titles WHERE jobID=? AND employeeID=?";

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

employeesJobTitlesRouter.get('/', (request, response) => {
  getAllData(response)
})

employeesJobTitlesRouter.get('/jobs', (request, response) => {
  mysql.pool.query(jobFilterQuery, [request.query.id], (err, rows, fields) => {
      if(err){
          next(err);
          return;
        }
      response.json({ "rows": rows })
  })
})

employeesJobTitlesRouter.get('/employees', (request, response) => {
  mysql.pool.query(employeeFilterQuery, [request.query.id], (err, rows, fields) => {
      if(err){
          next(err);
          return;
        }
      response.json({ "rows": rows })
  })
})

employeesJobTitlesRouter.post('/', (request,response,next) => {
  // Destructures properties from request body into variables named the same
  var {jobID, employeeID} = request.body;
 
  mysql.pool.query(insertQuery, [jobID, employeeID], (err, result) => {
    if(err){
      next(err);
      return;
    }
    getAllData(response);
  });
});

employeesJobTitlesRouter.delete('/', (request,response,next) => {
  mysql.pool.query(deleteQuery, [request.query.jid, request.query.eid], (err, result) => {
    if(err){
      next(err);
      return;
    }
    getAllData(response);
  });
});

module.exports = employeesJobTitlesRouter