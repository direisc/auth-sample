import { ErrorRequestHandler } from "express"

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  // TODO expect decide to use a logger library or externals for more accurate logs
  console.error(error)
  return res.status(500).json({ message: error.message })
};
