import express from 'express'
import userRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/media.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import { UPLOAD_MAIN_DIR } from './constants/dir'
import staticRouter from './routes/static.routes'
config()

const PORT = process.env.PORT_DEVELOPMENT

const app = express()
initFolder()

// Middleware to parse incoming requests come with JSON payloads
app.use(express.json())

// MongoDB
databaseService.connect()

// middleware log lại tất cả các request
app.all('*', (req, res, next) => {
  console.log('Time', Date.now())
  // console.log(req)
  next()
})

app.get('/', (req, res) => {
  res.send('hello world')
})

// express SỬ DỤNG userRouter nếu vô localhost:3000/users
app.use('/static', staticRouter)

app.use('/users', userRouter)

app.use('/medias', mediasRouter)

// Error handler tổng
app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log(`Project twitter này đang chạy trên port ${PORT}`)
})
