import request from 'supertest'
import { app } from './app'
import { createAccessToken, EXPIRES_IN } from './service'

describe('router /welcome', () => {
  it('successful', (done) => {
    const { access_token, token_type } = createAccessToken({ user_id: 0, user_email: 'user@mail.com' })
    request(app)
      .get('/welcome')
      .set('Authorization', `${token_type} ${access_token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(({ body }) => {
        expect(body.message).toBe('Welcome user@mail.com')
      })
      .end(done)
  })

  it('forbidden', (done) => {
    request(app)
      .get('/welcome')
      .expect('Content-Type', /json/)
      .expect(403)
      .expect(({ body }) => {
        expect(body.message).toBe('Forbidden')
      })
      .end(done)
  })
})