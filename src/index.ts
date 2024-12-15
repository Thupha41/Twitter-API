import express, { Request, Response, RequestHandler } from 'express'
import { envConfig } from './constants/config'
import initApiRoute from './routes/api'
import databaseService from './services/database.services'
import { matchedData, query, validationResult } from 'express-validator'

const PORT = envConfig.port
const app = express()

// Parse JSON body to object
app.use(express.json())

// Define a typed handler using RequestHandler
const helloHandler: RequestHandler = (req: Request, res: Response): void => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    const data = matchedData(req)
    console.log(data)
    res.send(`Hello ${req.query.person}`)
    return
  }

  res.status(400).json({ errors: errors.array() })
}

// Validation and route
app.use('/hello', query('person').notEmpty().withMessage('person query khong duoc de trong').escape(), helloHandler)

// Initialize API Routes
initApiRoute(app)

// Connect to database
databaseService.connect()

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
