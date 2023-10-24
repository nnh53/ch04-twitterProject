// giả sử anh đag làm route login
// thì người dùng sẽ truyền email và password
// tạo 1 req có body là email và password
// - làm 1 middleware kiểm tra xem email và password có đc truyền lên hay ko

//************  Request / Response : CHÚ Ý LÀ XÀI CỦA EXPRESS ****************** */
import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import userService from '~/services/users.services'
import { validate } from '~/utils/validation'

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
    // chỗ này kiểm tra thêm
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ error: 'email or password is missing' })
    }
    next()
}

/*
body: {
  name, 
  email, 
  password,
  confirm_password
  data_of_birth
}
*/

export const registerValidator = validate(
    checkSchema({
        name: {
            notEmpty: true,
            isString: true,
            trim: true,
            isLength: {
                options: {
                    min: 1,
                    max: 100
                }
            }
        },
        email: {
            notEmpty: true,
            isString: true,
            trim: true,
            isEmail: true,
            custom: {
                options: async (value, { req }) => {
                    const isExist = await userService.checkEmailExist(value)
                    if (isExist) {
                        throw new Error('email already exists')
                    }
                    return true
                }
            }
        },
        password: {
            notEmpty: true,
            isString: true,
            trim: true,
            isLength: {
                options: {
                    min: 8,
                    max: 50
                }
            },
            isStrongPassword: {
                options: {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                }
            },
            errorMessage:
                'Password must be at least 8 characters long, and contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol'
        },
        confirm_password: {
            notEmpty: true,
            isString: true,
            trim: true,
            isLength: {
                options: {
                    min: 8,
                    max: 50
                }
            },
            isStrongPassword: {
                options: {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                }
            },
            errorMessage:
                'Password must be at least 8 characters long, and contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol',
            custom: {
                options: (value, { req }) => {
                    if (value !== req.body.password) {
                        throw new Error('confirm_password does not match password')
                    }
                    return true
                }
            }
        },
        date_of_birth: {
            isISO8601: {
                options: {
                    strict: true,
                    strictSeparator: true
                }
            }
        }
    })
)
