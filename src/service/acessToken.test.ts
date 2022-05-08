import { verify } from 'jsonwebtoken'
import { createAccessToken, EXPIRES_IN, validateAccessToken } from './accessToken'

describe('accessToken', () => {
  describe('createAccessToken', () => {
    it('successful response', () => {
      const { access_token, expires_in, token_type } = createAccessToken({ user_id: 0, user_email: 'user@mail.com' })
      const jwt = validateAccessToken(access_token)
      expect(token_type).toBe('Bearer')
      expect(expires_in).toBe(EXPIRES_IN)
      expect(jwt.sub).toBe('user@mail.com')
    })
  })
  describe('validateAccessToken', () => {
    it('successful response', () => {
      const { access_token, expires_in, token_type } = createAccessToken({ user_id: 0, user_email: 'user@mail.com' })
      const jwt = validateAccessToken(access_token)
      expect(token_type).toBe('Bearer')
      expect(expires_in).toBe(EXPIRES_IN)
      expect(jwt.sub).toBe('user@mail.com')
    })
    it('invalid signature', () => {
      const { access_token } = createAccessToken({ user_id: 0, user_email: 'user@mail.com' })
      expect(() => validateAccessToken(`${access_token}error`)).toThrow('invalid signature')
    })
    it('jwt expired', () => {
      const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2NTE5MjcwNTQsImV4cCI6MTY1MTkzMDY1NCwic3ViIjoiYWxpY2VAcHJpc21hLmlvIn0.mNe7afB3wAlDhGpKBQYXfHCaus6IYXhbPEt969-JMK4'
      expect(() => validateAccessToken(expiredToken)).toThrow('jwt expired')
    })
  })
})