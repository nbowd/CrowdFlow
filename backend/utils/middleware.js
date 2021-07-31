// Custom middleware for the application. 
// Logging function for request/error information
// Handling for unknown or erroneous endpoints
// Exports to app.js to be incorporated

const logger = require('./logger')

// For debugging, to be removed in production
const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    next(error) // this is largely handled by the express-async-errors package
}


module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}