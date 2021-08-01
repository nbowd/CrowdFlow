const ticketsRouter = require('express').Router()
const eventsRouter = require('express').Router()
const fansRouter = require('express').Router()
const employeesRouter = require('express').Router()
const events_fansRouter = require('express').Router()
const mysql = require('../utils/config')
// SQL QUERIES
const getAllQuery = "SELECT ticketID, eventID, seat, row, section, price, paymentMethod, soldByEmployeeID, soldToFanID, isWillcall, isValid FROM Tickets";
const insertQuery = "INSERT INTO Tickets (eventID, seat, row, section, price, paymentMethod, soldByEmployeeID, soldToFanID, isWillcall, isValid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
const deleteQuery = "DELETE FROM Tickets WHERE `ticketID`=?";
const updateQuery = "UPDATE Tickets SET eventID=?, seat=?, row=?, section=?, price=?, paymentMethod=?, soldByEmployeeID=?, soldToFanID=?, isWillcall=?, isValid=? WHERE ticketID=?";
const getEventIDQuery = "SELECT `eventID` FROM `Events`;";
const getFansIDQuery = "SELECT `fanID` FROM `Fans`;";
const getEmployeesIDQuery = "SELECT `employeeID` FROM `Employees`;";
const insertEvent_fanQuery = "INSERT INTO Events_fans (eventID, fanID) VALUES (?, ?)";

// ROUTES

// GET route for page load
const getAllData = (response) => {

    mysql.pool.query(getAllQuery, (err, rows, fields) => {
        response.json({ "rows": rows });
    })
};

ticketsRouter.get('/', (request, response) => {
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

// GET route for all employee IDs
const getEmployeeID = (response) => {

    mysql.pool.query(getEmployeesIDQuery, (err, rows, fields) => {
        response.json({ "rows": rows });
    })
};

employeesRouter.get('/events', (request, response) => {
    getEmployeeID(response);
});

// POST route for adding a new row
const insertData = (request, response) => {

    mysql.pool.query(insertQuery, [request.body.eventID, request.body.seat, request.body.row, request.body.section, request.body.price, request.body.paymentMethod, request.body.soldByEmployeeID, request.body.soldToFanID, request.body.isWillcall, request.body.isValid], (err, rows, fields) => {
    });
    mysql.pool.query(insertEvent_fanQuery, [request.body.eventID, request.body.soldToFanID], (err, rows, fields) => {
    });
};

ticketsRouter.post('/', (request, response) => {
    insertData(request);
    getAllData(response);
});

// DELETE route for deleting a row
const deleteData = (request, response) => {

    mysql.pool.query(deleteQuery, [request.body.ticketID], (err, rows, fields) => {
    });
};

ticketsRouter.delete('/', (request, response) => {
    deleteData(request);
    getAllData(response);
});

// PUT route for updating a row
const updateData = (request, response) => {

    mysql.pool.query(updateQuery, [request.body.eventID, request.body.seat, request.body.row, request.body.section, request.body.price, request.body.paymentMethod, request.body.soldByEmployeeID, request.body.soldToFanID, request.body.isWillcall, request.body.isValid, request.body.ticketID], (err, rows, fields) => {
    });
};

ticketsRouter.put('/', (request, response) => {
    updateData(request);
    getAllData(response);
});

module.exports = ticketsRouter