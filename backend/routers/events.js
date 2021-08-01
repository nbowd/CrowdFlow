const eventsRouter = require('express').Router()
const mysql = require('../utils/config')
// SQL QUERIES
const getAllQuery = "SELECT eventID, eventName, musicType, eventDate, eventTime, isCancelled FROM Events";
const insertQuery = "INSERT INTO Events (eventName, musicType, eventDate, eventTime, isCancelled) VALUES (?,?,?,?,?)";
const deleteQuery = "DELETE FROM Events WHERE `eventID`=?";
const updateQuery = "UPDATE Events SET eventName=?, musicType=?, eventDate=?, eventTime=?, isCancelled=? WHERE eventID=?";
const filterBefore = "SELECT eventID, eventName, musicType, eventDate, eventTime, isCancelled FROM Events WHERE eventDate<?";
const filterOn = "SELECT eventID, eventName, musicType, eventDate, eventTime, isCancelled FROM Events WHERE eventDate=?";
const filterAfter = "SELECT eventID, eventName, musicType, eventDate, eventTime, isCancelled FROM Events WHERE eventDate>?";

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

// PUT route for updating a row
const updateData = (request, response) => {

    mysql.pool.query(updateQuery, [request.body.eventName, request.body.musicType, request.body.eventDate, request.body.eventTime, request.body.isCancelled, request.body.eventID], (err, rows, fields) => {
    });
};

eventsRouter.put('/', (request, response) => {
    updateData(request);
    getAllData(response);
});

// GET route for date filter
const filterResult = (request, response, dateFilter, filterDate) => {
    if (dateFilter === 'on') {
        mysql.pool.query(filterOn, [filterDate], (err, rows, fields) => {
            response.json({ "rows": rows });
        });
    } else if (dateFilter === 'before') {
        mysql.pool.query(filterBefore, [filterDate], (err, rows, fields) => {
            response.json({ "rows": rows });
        });
    } else if (dateFilter === 'after') {
        mysql.pool.query(filterAfter, [filterDate], (err, rows, fields) => {
            response.json({ "rows": rows });
        });
    }
};

eventsRouter.get('/:dateFilter/:filterDate', (request, response) => {
    filterResult(request, response, request.params.dateFilter, request.params.filterDate);
});

module.exports = eventsRouter