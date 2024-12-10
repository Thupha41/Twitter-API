import express from 'express'
import { envConfig } from './constants/config'
import initApiRoute from './routes/api'
import databaseService from './services/database.services'
//Load .env from dotenv config

const PORT = envConfig.port
const app = express()
//Parse json body to object
app.use(express.json())
initApiRoute(app)
//Connect to database
databaseService.connect()

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
