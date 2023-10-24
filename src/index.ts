import express from 'express'

import userRouter from './routes/users.routers'
import databaseService from './services/database.services'

const app = express()
app.use(express.json())
const PORT = 3000

// MongoDB
databaseService.connect()
// run().catch(console.dir) cũ

app.get('/', (req, res) => {
    res.send('hello world')
})

//thằng express SỬ DỤNG userRouter nếu vô localhost:3000/users

app.use('/users', userRouter)
//localhost:3000/users/

app.listen(PORT, () => {
    console.log(`Project twitter này đang chạy trên post ${PORT}`)
})
