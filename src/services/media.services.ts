import { UPLOAD_MAIN_DIR } from './../constants/dir'
import { Request } from 'express'
import { File, Files } from 'formidable'
import sharp from 'sharp'
import { getFileNameFromFile, handleUploadImage } from '~/utils/file'
import fs from 'fs'
import { isProduction } from '~/constants/config'

class MediaService {
  async uploadImage(req: Request) {
    // lưu ảnh vào trong uploads và temp
    const file = await handleUploadImage(req)

    // xử lý file bằng sharp giúp tối ưu hình ảnh
    // có thuộc tính tên là newFilename
    const newFileName = getFileNameFromFile(file.newFilename) + '.jpg'
    const newPath = UPLOAD_MAIN_DIR + '/' + newFileName
    const info = await sharp(file.filepath).jpeg().toFile(newPath)

    // xóa file trong temp
    fs.unlinkSync(file.filepath)

    // prettier-ignore
    return (
      isProduction
        ? `${process.env.HOST}/static/${newFileName}`
        : `http://localhost:${process.env.PORT_DEVELOPMENT}/static/image/${newFileName}`)
  }
}

const mediaServices = new MediaService()
export default mediaServices
