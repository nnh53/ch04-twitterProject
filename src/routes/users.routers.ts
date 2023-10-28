import { Router } from 'express'
import { loginController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { registerController } from '~/controllers/users.controllers'
import { wrapAsync } from '~/utils/handlers'

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

/*
des: đăng nhập 
path: /users/login
method: POST
body: { 
  email, 
  password
}
*/

userRouter.get('/login', loginValidator, loginController)

/*
des: đăng ký
path: /users/register
method: POST
body: {
  name, 
  email, 
  password,
  confirm_password
  data_of_birth
}
*/

userRouter.post('/register', registerValidator, wrapAsync(registerController)) //đúng ra là phải thêm có validator

export default userRouter
