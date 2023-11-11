import path from 'path'
import fs from 'fs'
import { Request } from 'express'
import formidable, { File } from 'formidable'
import { UPLOAD_TEMP_DIR } from '~/constants/dir'

export const initFolder = () => {
  if (!fs.existsSync(UPLOAD_TEMP_DIR)) {
    fs.mkdirSync(UPLOAD_TEMP_DIR, {
      recursive: true //cho phép tạo nested folder vd uploads/videos/...
    })
  }
}

/**
 * Get file name from file and remove all '.' in name
 * @param filename
 * @returns string
 */
export const getFileNameFromFile = (filename: string): string => {
  const nameArr = filename.split('.')
  nameArr.pop()
  return nameArr.join('')
}

// prettier-ignore
export const handleUploadImage = async (req: Request): Promise<File> => {
  const form = formidable({
    uploadDir: path.resolve(UPLOAD_TEMP_DIR), //lưu ở đâu
    maxFiles: 1, //tối đa bao nhiêu
    keepExtensions: true, //có lấy đuôi mở rộng không .png, .jpg
    maxFileSize: 300 * 1024, //tối đa bao nhiêu byte, 300kb
    filter: function ({ name, originalFilename, mimetype }) { //xài option filter để kiểm tra file có phải là image không
      //name: name|key truyền vào của <input name = bla bla>
      //originalFilename: tên file gốc
      //mimetype: kiểu file vd: image/png
      // console.log(name, originalFilename, mimetype) //log để xem, nhớ comment

      const valid = (name === 'image' && Boolean(mimetype?.includes('image/')))

      //mimetype? nếu là string thì check, k thì thôi
      //ép Boolean luôn, nếu k thì valid sẽ là boolean | undefined

      //nếu sai valid thì dùng form.emit để gữi lỗi
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
        //as any vì bug này formidable chưa fix, khi nào hết thì bỏ as any
      }
      //nếu đúng thì return valid
      return valid
    }
  })

  //form.parse về thành promise
  //files là object có dạng giống hình test code cuối cùng
  return new Promise<File>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err) //để ý dòng này

      if (!files.image) {
        return reject(new Error('Image is empty'))
      }

      return resolve((files.image as File[])[0])//files.image là array, lấy phần tử đầu tiên
    })
  })
}
