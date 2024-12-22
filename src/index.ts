import express, { Request, Response, RequestHandler } from 'express'
import { envConfig } from './constants/config'
import initApiRoute from './routes/api'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middleware'

const PORT = envConfig.port
const app = express()

// Parse JSON body to object
app.use(express.json())

// Initialize API Routes
initApiRoute(app)

// Validation and route
app.use(defaultErrorHandler)

// Connect to database
databaseService.connect()

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
