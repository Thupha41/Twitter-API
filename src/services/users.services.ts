import { ObjectId } from 'mongodb'
import User from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { RegisterReqBody } from '~/models/requests/users.requests'
class UsersService {
  async register(payload: RegisterReqBody) {
    const user_id = new ObjectId()
    await databaseService.users.insertOne(
      new User({
        ...payload,
        _id: user_id,
        username: `user${user_id.toString()}`,
        date_of_birth: new Date(payload.date_of_birth),
        password: payload.password
      })
    )
  }
}

const usersService = new UsersService()
export default usersService
