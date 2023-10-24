import databaseService from '~/services/database.services'
import User from '~/models/schemas/User.schema'
import { RegisterReqBody } from '~/models/requests/Users.request'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enums'
import { config } from 'dotenv'
config()

class UsersService {
    // hàm nhận vào user_id để bỏ vào payload tạo access token
    signAccessToken(user_id: string) {
        return signToken({
            payload: {
                user_id,
                token_type: TokenType.AccessToken,
                options: {
                    expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN
                }
            }
        })
    }

    // hàm nhận vào user_id để bỏ vào payload tạo refresh token
    signRefreshToken(user_id: string) {
        return signToken({
            payload: {
                user_id,
                token_type: TokenType.RefeshToken,
                options: {
                    expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN
                }
            }
        })
    }

    async checkEmailExist(email: string) {
        const user = await databaseService.users.findOne({ email })
        return Boolean(user)
    }

    async register(payLoad: RegisterReqBody) {
        const result = await databaseService.users.insertOne(
            new User({
                ...payLoad,
                date_of_birth: new Date(payLoad.date_of_birth),
                password: hashPassword(payLoad.password)
            })
        )

        // lấy user_id từ user mới tạo
        const user_id = result.insertedId.toString()
        const [access_token, refresh_token] = await Promise.all([
            this.signAccessToken(user_id),
            this.signRefreshToken(user_id)
        ])
        return [access_token, refresh_token]
    }
}

const userService = new UsersService()
export default userService
