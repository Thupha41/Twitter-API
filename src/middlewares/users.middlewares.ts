import { validate } from './../utils/validation'
import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      error: 'Missing email or password'
    })
  }
  next()
}

export const registerValidator = validate(
  checkSchema({
    email: {
      isEmail: true,
      trim: true,
      notEmpty: true
    },

    name: {
      notEmpty: true,
      trim: true,
      isString: true,
      isLength: {
        options: {
          min: 1,
          max: 100
        }
      }
    },

    password: {
      notEmpty: true,
      trim: true,
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1,
          minSymbols: 1,
          minUppercase: 1,
          minNumbers: 1
        }
      },
      errorMessage:
        'Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
    },

    confirm_password: {
      notEmpty: true,
      trim: true,
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1,
          minSymbols: 1,
          minUppercase: 1,
          minNumbers: 1
        }
      },
      errorMessage:
        'Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password')
          }
          return true
        }
      }
    },

    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        }
      }
    }
  })
)
