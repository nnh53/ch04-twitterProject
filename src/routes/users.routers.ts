import { Router } from 'express'
import { loginController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { registerController } from '~/controllers/users.controllers'
import { register } from 'module'

const userRouter = Router()

// userRouter.use(
//   (req, res, next) => {
//     console.log('Time', Date.now())
//     // return res.status(400).send('đồ ngu')
//     next()
//   }
//   // (req, res, next) => {
//   //   console.log('Time', Date.now())
//   //   next()
//   // }
// )

userRouter.get('/login', loginValidator, loginController)

// userRouter.post('/register', registerValidator, registerController) //đúng ra là phải thêm có validator
userRouter.post('/register', registerController) //đúng ra là phải thêm có validator

export default userRouter
