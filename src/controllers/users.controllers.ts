import { ParamsDictionary } from 'express-serve-static-core'
import { register } from 'module'
import { Request, Response } from 'express'
import databaseService from '~/services/database.services'
// import User from '~/models/schemas/User.schema'
import userService from '~/services/users.services'
import { RegisterReqBody } from '~/models/requests/Users.request'

export const loginController = (req: Request, res: Response) => {
    const { email, password } = req.body
    if (email === 'test@gmail.com' && password === '123123') {
        return res.json({
            message: 'login success',
            result: [
                { name: 'Điệp', yob: 1999 },
                { name: 'Được', yob: 1994 },
                { name: 'Hùng', yob: 2004 }
            ]
        })
        // .send('test success')
    }

    return res.status(400).json({ message: 'login failed' })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
    try {
        // const { email, password, confirm_password,  } = req.body
        // nhét vô database
        const result = await userService.register(req.body)
        res.json({ message: 'register success', result })
    } catch (error) {
        res.status(400).json({ message: 'register failed', error })
    }
}
