import { compareSync } from 'bcrypt'
import { RequestHandler } from 'express'
import { prisma, createAccessToken } from '../service'

const MESSAGE_USER_PASS_WRONG = 'user or password is wrong'
const MESSAGE_USER_PASS_REQUIRED = 'username and password are required'

export const authenticate: RequestHandler = async (req, res) => {
  const { username: email, password } = req.body

  // TODO refactor to use schema validator
  if (!email || !password) {
    return res.status(400).json({ message: MESSAGE_USER_PASS_REQUIRED })
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return res.status(401).json({ message: MESSAGE_USER_PASS_WRONG })
  }

  const passwordCheck = compareSync(password, user.password)
  if (!passwordCheck) {
    return res.status(401).json({ message: MESSAGE_USER_PASS_WRONG })
  }

  const { id: user_id, email: user_email } = user

  const authenticateResponse = createAccessToken({ user_id, user_email })

  return res.status(200).json(authenticateResponse)
}