import { NextFunction, Request, Response } from 'express'
import { createAccessToken } from '../service'
import { authMiddleware } from './authMiddleware'


describe('authMiddleware', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let nextFunction: NextFunction = jest.fn()

  beforeEach(() => {
    mockRequest = { headers: {} }
    mockResponse = {
      status: jest.fn(() => mockResponse as Response),
      json: jest.fn(),
    }
  })

  it('without headers', async () => {
    const expectedResponse = { message: 'Forbidden' }
    authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction)
    expect(mockResponse.json).toBeCalledWith(expectedResponse)
  })

  it('with wrong headers', async () => {
    const { token_type, access_token } = createAccessToken({ user_id: 0, user_email: 'user@mail.com' })
    const expectedResponse = { message: 'Forbidden' }
    mockRequest = {
      headers: {
        authorization: `${token_type} ${access_token}error`
      }
    }
    authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction)
    expect(mockResponse.json).toBeCalledWith(expectedResponse)
  })

  it('successfully middleware pass', () => {
    const { token_type, access_token } = createAccessToken({ user_id: 0, user_email: 'user@mail.com' })
    mockRequest = {
      headers: {
        authorization: `${token_type} ${access_token}`
      }
    }
    authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction)
    expect(nextFunction).toBeCalledTimes(1);
  })
})