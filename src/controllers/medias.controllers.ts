import { NextFunction, Request, Response } from 'express'
import formidable from 'formidable'
import path from 'path'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import { USERS_MESSAGES } from '~/constants/message'
import mediaServices from '~/services/media.services'
import { handleUploadImage } from '~/utils/file'

export const uploadImageController = async (req: Request, res: Response) => {
  const url = await mediaServices.uploadImage(req)

  return res.json({
    result: url,
    message: USERS_MESSAGES.UPLOAD_SUCCESS
  })
}

export const serveImageController = async (req: Request, res: Response, next: NextFunction) => {
  const { filename } = req.params

  res.sendFile(path.resolve(UPLOAD_IMAGE_DIR, filename), (err) => {
    if (err) {
      res.status((err as any).status).send('Not found image')
    }
  })
}

export const uploadVideoController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediaServices.uploadVideo(req) //uploadVideo chưa làm
  return res.json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: url
  })
}

//khỏi async vì có đợi gì đâu
export const serveVideoController = (req: Request, res: Response, next: NextFunction) => {
  const { filename } = req.params //lấy filename từ param string
  res.sendFile(path.resolve(UPLOAD_VIDEO_DIR, filename), (error) => {
    if (error) {
      return res.status((error as any).status).send('File not found')
    }
  })
}
