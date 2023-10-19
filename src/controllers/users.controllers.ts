import { Request, Response } from 'express'
import databaseService from '~/services/database.services'
import User from '~/models/schemas/User.schema'

export const loginController = (req: Request, res: Response) => {
  const sone: number = 1
  const a: number = sone
  console.log(a)

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

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    // nhét vô database
    const result = await databaseService.users.insertOne(
      new User({
        email,
        password
      })
    )
    res.json({ message: 'register success', result })
  } catch (error) {
    res.status(400).json({ message: 'register failed', error })
  }
}
