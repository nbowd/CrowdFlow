// The index.js file only imports the application from the app.js file 
//  and then starts the application. 

const app = require('./app')
const http = require('http')
const logger = require('./utils/logger') 

const server = http.createServer(app)

// This will change depending on how we deploy
const PORT = 4598

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})