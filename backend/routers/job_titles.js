const jobTitlesRouter = require('express').Router()
const mysql = require('../utils/config')


//  Populate page table
const getAllQuery = "SELECT * FROM Job_titles";

//  Add new job title
const insertQuery = "INSERT INTO Job_titles (jobID, title, description) VALUES (?, ?, ?)";

//  Update job from button
const updateQuery = "UPDATE Job_titles SET title=?, description=? WHERE jobID=?";

//  Delete job from button
const deleteQuery = "DELETE FROM Job_titles WHERE jobID=?";

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

jobTitlesRouter.get('/', (request, response) => {
  getAllData(response)
})

jobTitlesRouter.post('/', (request,response,next) => {
  // Destructures properties from request body into variables named the same
  var {jobID, title, description} = request.body;
  mysql.pool.query(insertQuery, [jobID, title, description], (err, result) => {
    if(err){
      next(err);
      return;
    }
    getAllData(response);
  });
});

jobTitlesRouter.put('/', (request,response,next) => {
  var {title, description} = request.body;

  mysql.pool.query(updateQuery,
    [title, description, request.query.id],
    (err, result) => {
    if(err){
      next(err);
      return;
    }
    getAllData(response);
  });
});

jobTitlesRouter.delete('/', (request,response,next) => {
  mysql.pool.query(deleteQuery, [request.query.id], (err, result) => {
    if(err){
      next(err);
      return;
    }
    getAllData(response);
  });
});

module.exports = jobTitlesRouter