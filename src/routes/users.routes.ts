import { Router } from 'express'
import {
  loginController,
  registerController,
  logoutController,
  verifyEmailController,
  resendVerifyEmailController,
  forgotPasswordController,
  verifyForgotPasswordController,
  resetPasswordController
} from '~/controllers/users.controllers'
import {
  loginValidator,
  registerValidator,
  accessTokenValidator,
  refreshTokenValidator,
  emailVerifyTokenValidator,
  forgotPasswordValidator,
  verifyForgotPasswordTokenValidator,
  resetPasswordValidator
} from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const userRouter = Router()

/**
 * Description: Login a user
 * Path: /login
 * method: POST
 * Body: {email: string, password: string}
 */

userRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
/**
 * Description: Register a new user
 * Path: /register
 * method: POST
 * Body: {name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601}
 */
userRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

/**
 * Description: Logout a user
 * Path: /logout
 * method: POST
 * Header: {Authorization: Bearer <access_token>}
 * Body: {refresh_token: string}
 */
userRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

/**
 * Description: Verify email when user click on the link in email
 * Path: /verify-email
 * method: POST
 * Header: {Authorization: Bearer <access_token>}
 * Body: {email_verify_token: string}
 */
userRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(verifyEmailController))

/**
 * Description: Verify email when user client click on the link in email
 * Path: /resend-verify-email
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: {}
 */
userRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendVerifyEmailController))

/**
 * Description: Submit email to reset password, send email to user
 * Path: /forgot-password
 * Method: POST
 * Body: {email: string}
 */
userRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))

/**
 * Description: Verify link in email to reset password
 * Path: /verify-forgot-password
 * Method: POST
 * Body: {forgot_password_token: string}
 */
userRouter.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidator,
  wrapRequestHandler(verifyForgotPasswordController)
)

/**
 * Description: Reset password
 * Path: /reset-password
 * Method: POST
 * Body: {forgot_password_token: string, password: string, confirm_password: string}
 */
userRouter.post('/reset-password', resetPasswordValidator, wrapRequestHandler(resetPasswordController))
export default userRouter
