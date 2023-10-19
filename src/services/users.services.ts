import databaseService from '~/services/database.services'
import User from '~/models/schemas/User.schema'

class UsersService {
  async register(payLoad: { email: string; password: string }) {
    const { email, password } = payLoad
    const result = await databaseService.users.insertOne(
      new User({
        email,
        password
      })
    )
    return result
  }
}

const userService = new UsersService()
export default userService
