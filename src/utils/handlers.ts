import { RequestHandler } from 'express'
import { Request, Response, NextFunction } from 'express'

export const wrapAsync = (func: RequestHandler) => async (req: Request, res: Response, next: NextFunction) => {
  // tạo cấu trục try catch
  try {
    await func(req, res, next)
  } catch (error) {
    next(error)
  }
}
