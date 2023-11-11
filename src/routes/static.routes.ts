import { Router } from 'express'
import { serveImageController, serveVideoController } from '~/controllers/medias.controllers'

const staticRouter = Router()

staticRouter.get('/image/:filename', serveImageController)

staticRouter.get('/video/:filename', serveVideoController) //chưa code

export default staticRouter
