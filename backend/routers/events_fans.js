const ticketsRouter = require('express').Router()
const eventsRouter = require('express').Router()
const fansRouter = require('express').Router()
const events_fansRouter = require('express').Router()
const employeesRouter = require('express').Router()
const mysql = require('../utils/config')

// SQL QUERIES
const getAllQuery = "SELECT eventID, fanID FROM Events_fans";
const insertQuery = "INSERT INTO Events_fans (eventID, fanID) VALUES (?, ?)";
const deleteQuery = "DELETE FROM Events_fans WHERE `eventID`=? AND `fanID`=?";
const updateQuery = "UPDATE Events_fans SET eventID=?, fanID=? WHERE eventID=? AND fanID=?";
const getEventIDQuery = "SELECT `eventID` FROM `Events`;";
const getFansIDQuery = "SELECT `fanID` FROM `Fans`;";

// GET route for page load
const getAllData = (response) => {

    mysql.pool.query(getAllQuery, (err, rows, fields) => {
        response.json({ "rows": rows });
    })
};

events_fansRouter.get('/', (request, response) => {
    getAllData(response);
});

// POST route for adding a new row
const insertData = (request, response) => {

    mysql.pool.query(insertQuery, [request.body.eventID, request.body.fanID], (err, rows, fields) => {
    });
};

events_fansRouter.post('/', (request, response) => {
    insertData(request);
    getAllData(response);
});

// GET route for all event IDs
const getEventID = (response) => {

    mysql.pool.query(getEventIDQuery, (err, rows, fields) => {
        response.json({ "rows": rows });
    })
};

eventsRouter.get('/events', (request, response) => {
    getEventID(response);
});

// GET route for all fan IDs
const getFanID = (response) => {

    mysql.pool.query(getFansIDQuery, (err, rows, fields) => {
        response.json({ "rows": rows });
    })
};

fansRouter.get('/events', (request, response) => {
    getFanID(response);
});

// PUT route for updating a row
const updateData = (request, response) => {

    mysql.pool.query(updateQuery, [request.body.newEventID, request.body.newFanID, request.body.oldEventID, request.body.oldFanID], (err, rows, fields) => {
    });
};

events_fansRouter.put('/', (request, response) => {
    updateData(request);
    getAllData(response);
});

// DELETE route for deleting a row
const deleteData = (request, response) => {

    mysql.pool.query(deleteQuery, [request.body.eventID, request.body.fanID], (err, rows, fields) => {
    });
};

events_fansRouter.delete('/', (request, response) => {
    deleteData(request);
    getAllData(response);
});

module.exports = events_fansRouter