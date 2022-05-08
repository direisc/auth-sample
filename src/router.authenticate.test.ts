import request from 'supertest'
import { app } from './app'
import { EXPIRES_IN } from './service'

describe('router /authenticate', () => {
  it('successful authentication', (done) => {
    request(app)
      .post('/authenticate')
      .send({
        username: 'alice@prisma.io',
        password: 'alicePWD'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(({ body }) => {
        expect(body.token_type).toBe('Bearer')
        expect(body.expires_in).toBe(EXPIRES_IN)
        expect(body.access_token.split('.').length).toBe(3)
      })
      .end(done)
  })

  it('user or password is wrong (username)', (done) => {
    request(app)
      .post('/authenticate')
      .send({
        username: 'alice@prisma.ioerror',
        password: 'alicePWD'
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .expect(({ body }) => {
        expect(body.message).toBe('user or password is wrong')
      })
      .end(done)
  })

  it('user or password is wrong (password)', (done) => {
    request(app)
      .post('/authenticate')
      .send({
        username: 'alice@prisma.io',
        password: 'alicePWDerror'
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .expect(({ body }) => {
        expect(body.message).toBe('user or password is wrong')
      })
      .end(done)
  })
})