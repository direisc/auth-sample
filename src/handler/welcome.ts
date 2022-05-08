import { RequestHandler } from 'express'

export const welcome: RequestHandler = async (req, res) => {
  return res.status(200).json({
    message: `Welcome ${req.user.sub}`,
  })
}