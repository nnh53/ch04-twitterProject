import jwt from 'jsonwebtoken'
import { TokenPayload } from '~/models/requests/Users.request'

// prettier-ignore
export const signToken = (
  {
    payload,
    privateKey,
    options = { algorithm: 'HS256', expiresIn: '1d' }
  } : 
    {
      payload: string | object | Buffer
      privateKey: string
      options?: jwt.SignOptions
    }
) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err: any, token: any) => {
      if (err) reject(err)

      resolve(token as string)
    
    })
  })
}

export const verifyToken = ({
  token,
  publicOrSecretKey,
  options = { algorithms: ['HS256'] }
}: {
  token: string
  publicOrSecretKey: string
  options?: jwt.VerifyOptions
}) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, publicOrSecretKey, (err, decoded) => {
      // decoded là payload đã decode
      if (err) throw reject(err)
      resolve(decoded as TokenPayload)
    })
  })
}
