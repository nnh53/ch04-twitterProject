import express, { NextFunction, Request, Response } from 'express'

import userRouter from './routes/users.routers'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'

const PORT = 3000

const app = express()
app.use(express.json())

// MongoDB
databaseService.connect()

app.get('/', (req, res) => {
  res.send('hello world')
})

//thằng express SỬ DỤNG userRouter nếu vô localhost:3000/users
app.use('/users', userRouter)
//localhost:3000/users/

// error handler tổng
app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log(`Project twitter này đang chạy trên post ${PORT}`)
})
