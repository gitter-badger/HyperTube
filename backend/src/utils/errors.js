export class NotFoundError {
  constructor (target) {
    this.target = target
  }
}

export class ValidationError {
  constructor (target, action) {
    this.target = target
    this.action = action
  }
}

export class BadAuthorizationError {
  constructor (problem) {
  }
}

export class NotAuthorizedError {
}

export class AlreadyExistingAccount {
}

export class UndefinedPassword {
}

export const handleError = (err, res, message) => {
  Logger.error('In error handler', err)
  if (err instanceof NotFoundError) {
    return res.status(404).json({ results: null, message: `${err.target} not found` })
  } else if (err instanceof ValidationError) {
    return res.status(400).json({ results: null, message: `Parameter ${err.target} is ${err.action}` })
  } else if (err instanceof BadAuthorizationError) {
    return res.status(401).json({ results: null, message: `Authorization header is ${err.problem}` })
  } else if (err instanceof NotAuthorizedError) {
    return res.status(403).json({ results: null, message: 'You are not authorized to perform this action' })
  } else if (err instanceof AlreadyExistingAccount) {
    return res.status(400).json({ results: null, message: 'Account already exists' })
  } else if (err instanceof UndefinedPassword) {
    return res.status(400).json({ results: null, message: 'Password not defined' })
  }
  res.status(500).json({ results: null, message })
}
