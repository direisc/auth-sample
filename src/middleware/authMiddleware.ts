import { RequestHandler } from "express"
import { validateAccessToken } from '../service'

export const authMiddleware: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  try {
    const token = authorization.slice(7)
    req.user = validateAccessToken(token)
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Forbidden' })
  }
}
