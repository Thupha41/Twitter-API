import express from 'express'
import { validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'

// can be reused by many routes
export const validate = (validations: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // sequential processing, stops running validations chain if one fails.
    await validations.run(req)
    const errors = validationResult(req)
    //If not error
    if (errors.isEmpty()) {
      return next()
    }
    res.status(400).json({ errors: errors.mapped() })
  }
}
