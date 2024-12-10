import express from 'express'
import dotenv from 'dotenv'
import initApiRoute from './routes/api'

//Load .env from dotenv config
dotenv.config()

const app = express()
//Parse json body to object
app.use(express.json())
const PORT = process.env.PORT

type Number = {
  a: number
  b: number
}
initApiRoute(app)
const sum = (obj: Number) => {
  return obj.a + obj.b
}
const value = sum({ a: 1, b: 2 })

app.get('/', (req, res) => {
  res.send(`Hello World. Your value is ${value}`)
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
