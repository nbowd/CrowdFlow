const express = require('express')
require('express-async-errors')  // Handles errors so try/catch isn't needed anymore
const app = express()
const middleware = require('./utils/middleware')

const fansRouter = require('./routers/fans') // EXAMPLE
const employeesRouter = require('./routers/employees')
const jobTitlesRouter = require('./routers/job_titles')
const employeesJobTitlesRouter = require('./routers/employees_job_titles')

const cors = require('cors')  // Not sure if needed yet

// Build Options
app.use(cors())
app.use(express.urlencoded({ extended: false })); // not sure if this is needed
app.use(express.json())
app.use(middleware.requestLogger)

// Routers
// Events router

// Fans router
app.use('/fans', fansRouter) // EXAMPLE

// Events_fans router

// Employees router
app.use('/employees', employeesRouter)

// JobTitles router
app.use('/jobs', jobTitlesRouter)

// Employees_job_titles router
app.use('/emp_jobs', employeesJobTitlesRouter)

//  Tickets router


// Error Handling
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app