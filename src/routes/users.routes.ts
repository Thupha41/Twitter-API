import { Router } from 'express'
import { registerController } from '~/controllers/users.controllers'
import { registerValidator } from '~/middlewares/users.middlewares'

const userRouter = Router()

userRouter.post('/login')
/**
 * Description: Register a new user
 * Path: /register
 * method: POST
 * Body: {name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601}
 */
userRouter.post('/register', registerValidator, registerController)

export default userRouter
