import request from 'supertest'
import { app } from './app'

describe('router /', () => {
  it('successful', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(({ body }) => {
        expect(body.name).toBe('Auth Service')
      })
      .end(done)
  })
})