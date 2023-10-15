import express from 'express'

import userRouter from './users.routers'

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('hello world')
})

app.use('/api', userRouter)
//ra gì

app.listen(PORT, () => {
  console.log(`Project twitter này đang chạy trên post ${PORT}`)
})
