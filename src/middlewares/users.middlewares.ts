// giả sử anh đag làm route login
// thì người dùng sẽ truyền email và password
// tạo 1 req có body là email và password
// - làm 1 middleware kiểm tra xem email và password có đc truyền lên hay ko

//************  Request / Response : CHÚ Ý LÀ XÀI CỦA EXPRESS ****************** */
import { NextFunction, Request, Response } from 'express'

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  // chỗ này kiểm tra thêm
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'email or password is missing' })
  }
  next()
}
