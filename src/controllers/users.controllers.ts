import { Request, Response } from 'express'
import usersService from '~/services/users.services'
export const loginController = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World' })
}

export const registerController = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await usersService.register(req.body)
    res.json({
      message: 'Register Successfully',
      result
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'An error occurred' })
  }
}
