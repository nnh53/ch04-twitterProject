import jwt from 'jsonwebtoken'

export const signToken = ({
    payload,
    privateKey = process.env.JWT_SECRET_KEY as string,
    options = { algorithm: 'HS256', expiresIn: '1d' }
}: {
    payload: string | object | Buffer
    privateKey?: string
    options?: jwt.SignOptions
}) => {
    return new Promise<string>((resolve, reject) => {
        jwt.sign(payload, privateKey, options, (err: any, token: any) => {
            if (err) reject(err)
            resolve(token as string)
        })
    })
}
