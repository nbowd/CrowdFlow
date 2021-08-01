const express = require('express')
require('express-async-errors')  // Handles errors so try/catch isn't needed anymore
const app = express()
const middleware = require('./utils/middleware')

const fansRouter = require('./routers/fans') // EXAMPLE
const eventsRouter = require('./routers/events')
const ticketsRouter = require('./routers/tickets')
const events_fansRouter = require('./routers/events_fans')
const employeesRouter = require('./routers/employees')

// const cors = require('cors')  // Not sure if needed yet

// Build Options
app.use(express.urlencoded({ extended:false })); // not sure if this is needed
app.use(express.json())
app.use(middleware.requestLogger)

// Routers
// Events router
app.use('/events', eventsRouter)

// Fans router
app.use('/fans', fansRouter) // EXAMPLE

// Events_fans router
app.use('/events_fans', events_fansRouter)

// Employees router

// JobTitles router

// Employees_job_titles router

//  Tickets router
app.use('/tickets', ticketsRouter)


// Error Handling
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
