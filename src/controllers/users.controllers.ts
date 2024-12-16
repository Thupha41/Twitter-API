import { Request, Response } from 'express'
import usersService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/users.requests'
export const loginController = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World' })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const result = await usersService.register(req.body)
  res.json({
    message: 'User registered successfully',
    result
  })
  return
}
