import { JwtPayload, sign, verify } from 'jsonwebtoken'

export const EXPIRES_IN = 3600
export const SECRET = 'secret@123'

export type User = JwtPayload & { user_id: number }

type TokenRequest = {
  user_id: number,
  user_email: string,
}

export const createAccessToken = ({user_id, user_email: subject}: TokenRequest) => {
  // TODO for more usable auth system needs implements a refresh_token
  // after refresh we can implements token revoque and IP restriction for complete security
  const access_token = sign({ user_id }, SECRET ,{ expiresIn: EXPIRES_IN, subject })
  return { access_token, expires_in: EXPIRES_IN, token_type: 'Bearer' }
}

export const validateAccessToken = (token: string) => {
  return verify(token, SECRET) as User
}