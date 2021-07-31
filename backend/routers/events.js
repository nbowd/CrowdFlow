const eventsRouter = require('express').Router()
const mysql = require('../utils/config')
// SQL QUERIES
const getAllQuery = "SELECT eventID, eventName, musicType, eventDate, eventTime, isCancelled FROM Events";
const insertQuery = "INSERT INTO Events (eventName, musicType, eventDate, eventTime, isCancelled) VALUES (?,?,?,?,?)";
const deleteQuery = "DELETE FROM Events WHERE `eventID`=?";

// ROUTES

// GET route for page load
const getAllData = (response) => {

    mysql.pool.query(getAllQuery, (err, rows, fields) => {
        response.json({ "rows": rows });
    })
};

eventsRouter.get('/', (request, response) => {
    getAllData(response);
});

// POST route for adding a new row
const insertData = (request, response) => {

    mysql.pool.query(insertQuery, [request.body.eventName, request.body.musicType, request.body.eventDate, request.body.eventTime, request.body.isCancelled], (err, rows, fields) => {
    });
};

eventsRouter.post('/', (request, response) => {
    insertData(request);
    getAllData(response);
});

// DELETE route for deleting a row
const deleteData = (request, response) => {

    mysql.pool.query(deleteQuery, [request.body.eventID], (err, rows, fields) => {
    });
};

eventsRouter.delete('/', (request, response) => {
    deleteData(request);
    getAllData(response);
});

module.exports = eventsRouter