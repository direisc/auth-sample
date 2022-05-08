import { NextFunction, Request, Response } from 'express'
import { User } from '../service'
import { welcome } from './welcome'

describe('welcome', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let nextFunction: NextFunction = jest.fn()

  beforeEach(() => {
    mockRequest = { headers: {}, user: { sub: 'user' } as User }
    mockResponse = {
      status: jest.fn(() => mockResponse as Response),
      json: jest.fn(),
    }
  })

  it('successful message', async () => {
    const expectedResponse = { message: 'Welcome user' }
    welcome(mockRequest as Request, mockResponse as Response, nextFunction)
    expect(mockResponse.json).toBeCalledWith(expectedResponse)
  })
})