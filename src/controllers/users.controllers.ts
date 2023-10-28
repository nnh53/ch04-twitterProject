import { ParamsDictionary } from 'express-serve-static-core'
import { Request, Response } from 'express'
import userService from '~/services/users.services'
import { RegisterReqBody } from '~/models/requests/Users.request'

export const loginController = async (req: Request, res: Response) => {
  //lấy user_id từ user của req
  const { user }: any = req
  const user_id = user._id
  // dùng user_id tạo ra access_token và refresh_token
  const result = await userService.login(user_id.toString())
  // res access_token và refresh_token về cho client
  res.json({ message: 'login success', result })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  // const { email, password, confirm_password,  } = req.body
  // nhét vô database
  const result = await userService.register(req.body)
  res.json({ message: 'register success', result })
}
