const fansRouter = require('express').Router()
const mysql = require('../utils/config')
// SQL QUERIES
const getAllQuery = "SELECT * FROM Fans";

// Add new fan
const insertQuery = "INSERT INTO Fans (firstName, lastName, birthdate, gender, phone, email, membership, comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

// Search by fanID
const idFilterQuery = "SELECT fanID, firstName, lastName, birthdate, gender, phone, email, membership, comment FROM Fans WHERE fanID=?";

// Search by Fan First Name
const fnameFilterQuery = "SELECT fanID, firstName, lastName, birthdate, gender, phone, email, membership, comment FROM Fans ORDER BY firstName ASC";

// Search by Fan Last Name
const lnameFilterQuery = "SELECT fanID, firstName, lastName, birthdate, gender, phone, email, membership, comment FROM Fans ORDER BY lastName ASC";

// Fan updated from button
const updateQuery = "UPDATE Fans SET firstName=?, lastName=?, birthdate=?, gender=?, phone=?, email=?, membership=?, comment=? WHERE fanID=?";

// Delete fan
const deleteQuery = "DELETE FROM Fans WHERE fanID=?";

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

fansRouter.get('/', (request, response) => {
    getAllData(response)
})

fansRouter.get('/searchid', (request, response) => {
    mysql.pool.query(idFilterQuery, [request.query.id], (err, rows, fields) => {
        if(err){
            next(err);
            return;
          }
        response.json({ "rows": rows })
    })
})

fansRouter.get('/first', (request, response) => {
    mysql.pool.query(fnameFilterQuery, (err, rows, fields) => {
        if(err){
            next(err);
            return;
          }
        response.json({ "rows": rows })
    })
})

fansRouter.get('/last', (request, response) => {
    mysql.pool.query(lnameFilterQuery, (err, rows, fields) => {
        if(err){
            next(err);
            return;
          }
        response.json({ "rows": rows })
    })
})

fansRouter.post('/', (request,response,next) => {
    // Destructures properties from request body into variables named the same
    var {firstName, lastName, birthdate, gender, phone, email, membership, comment} = request.body;
   
    mysql.pool.query(insertQuery, [firstName, lastName, birthdate, gender, phone, email, membership, comment], (err, result) => {
      if(err){
        next(err);
        return;
      }
      getAllData(response);
    });
});

fansRouter.put('/', (request,response,next) => {
    var {firstName, lastName, birthdate, gender, phone, email, membership, comment} = request.body;
  
    mysql.pool.query(updateQuery,
      [firstName, lastName, birthdate, gender, phone, email, membership, comment, request.query.id],
      (err, result) => {
      if(err){
        next(err);
        return;
      }
      getAllData(response);
    });
});

fansRouter.delete('/', (request,response,next) => {
    mysql.pool.query(deleteQuery, [request.query.id], (err, result) => {
      if(err){
        next(err);
        return;
      }
      getAllData(response);
    });
  });

  


module.exports = fansRouter