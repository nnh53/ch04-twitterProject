import { Router } from 'express'
import {
  emailVerifyController,
  forgotPasswordController,
  getMeController,
  loginController,
  logoutController,
  resendEmailVerifyController,
  resetPasswordController,
  verifyForgotPasswordController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  verifyForgotPasswordTokenValidator
} from '~/middlewares/users.middlewares'
import { registerController } from '~/controllers/users.controllers'
import { wrapAsync } from '~/utils/handlers'
import { verify } from 'crypto'

const usersRouter = Router()

// usersRouter.use(
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
usersRouter.get('/login', loginValidator, wrapAsync(loginController))

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
usersRouter.post('/register', registerValidator, wrapAsync(registerController)) //đúng ra là phải thêm có validator

usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapAsync(logoutController))

/*
des: email verify token  
khi ng dùng đăng ký họ sẽ nhận đc mail có link dạng 
https://localhost:3000/users/verify-email?token=<email_verify_token>

nếu mà em nhấp vào link thì tạo ra req gửi email_verify_token lên server 

server kiểm tra email_verify_token có hợp lệ hay không? (tức là access_token có hợp lệ hay không)

thì từ decode_email_verify_token lấy ra user_id

và vào user_id đó để update email_verify_token thành '', verify = 1, update_at

path: /users/verify-email
method: POST
body: {
  email_verify_token: string  
}
*/
usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapAsync(emailVerifyController))

/*
des: resend email verify token
khi mail thất lạc hoặc hết hạn thì ng dùng có nhu cầu resend lại email_verify_token

method: POST
path: /users/resend-verify-email
headers: {Authorization : "Bearer <access_token>"} //đăng nhập mới đc resend 
body: {}
*/
usersRouter.post('/resend-verify-email', accessTokenValidator, wrapAsync(resendEmailVerifyController))

/*
des: khi ng dùng quên mật khẩu, họ gửi email để xin mình tạo cho họ forgot_password_token
method: POST
path: /users/forgot-password
body: {
  email: string
}
*/
usersRouter.post('/forgot-password', forgotPasswordValidator, wrapAsync(forgotPasswordController))

/*
des: khi ng dùng nhấp vào link trong mail để reset password
họ sẽ gửi req kèm theo forgot_password_token lên 
 */

usersRouter.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidator,
  wrapAsync(verifyForgotPasswordController)
)

/*
des: reset password
path: '/reset-password'
method: POST
Header: không cần, vì  ngta quên mật khẩu rồi, thì sao mà đăng nhập để có auth đc
body: {forgot_password_token: string, password: string, confirm_password: string}
*/
usersRouter.post(
  '/reset-password',
  resetPasswordValidator,
  verifyForgotPasswordTokenValidator,
  wrapAsync(resetPasswordController)
)

/*
des: get profile của user
path: '/me'
method: get
Header: {Authorization: Bearer <access_token>}
body: {}
*/
usersRouter.get('/me', accessTokenValidator, wrapAsync(getMeController))

export default usersRouter
