import { Router } from 'express'

const userRouter = Router()

userRouter.use(
  (req, res, next) => {
    console.log('Time', Date.now())
    // return res.status(400).send('đồ ngu')
    next()
  },
  (req, res, next) => {
    console.log('Time', Date.now())
    next()
  }
)

userRouter.get('/tweets', (req, res) => {
  res.json({
    data: [
      { name: 'Điệp', yob: 1999 },
      { name: 'Được', yob: 1994 },
      { name: 'Hùng', yob: 2004 }
    ]
  })
})

export default userRouter
