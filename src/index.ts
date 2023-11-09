import express from 'express'

import userRouter from './routes/users.routers'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'

const PORT = 3000

const app = express()

// Middleware to parse incoming requests come with JSON payloads
app.use(express.json())

// MongoDB
databaseService.connect()

// middleware log lại tất cả các request
// app.all('*', (req, res, next) => {
//   console.log('Time', Date.now())
//   next()
// })

app.get('/', (req, res) => {
  res.send('hello world')
})

// express SỬ DỤNG userRouter nếu vô localhost:3000/users
app.use('/users', userRouter)

// Error handler tổng
app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log(`Project twitter này đang chạy trên port ${PORT}`)
})
