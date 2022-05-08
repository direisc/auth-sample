import { NextFunction, Request, Response } from 'express'
import { isGeneratorFunction } from 'util/types'
import { authenticate } from './authenticate'

describe('authenticate', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let nextFunction: NextFunction = jest.fn()

  beforeEach(() => {
    mockRequest = { headers: {}, body: {} }
    mockResponse = {
      status: jest.fn((x) => mockResponse as Response),
      json: jest.fn(),
    }
  })

  it('successful message', async () => {
    mockRequest.body = {
      username: 'alice@prisma.io',
      password: 'alicePWD'
    }
    await authenticate(mockRequest as Request, mockResponse as Response, nextFunction)
    expect(mockResponse.status).toBeCalledWith(200)
  })

  it('username and password are required', async () => {
    await authenticate(mockRequest as Request, mockResponse as Response, nextFunction)
    expect(mockResponse.status).toBeCalledWith(400)
    expect(mockResponse.json).toBeCalledWith({ message: 'username and password are required' })
  })

  it('user or password is wrong (username)', async () => {
    mockRequest.body = {
      username: 'alice@prisma.ioerror',
      password: 'alicePWD'
    }
    await authenticate(mockRequest as Request, mockResponse as Response, nextFunction)
    expect(mockResponse.status).toBeCalledWith(401)
    expect(mockResponse.json).toBeCalledWith({ message: 'user or password is wrong' })
  })

  it('user or password is wrong (password)', async () => {
    mockRequest.body = {
      username: 'alice@prisma.io',
      password: 'alicePWDerror'
    }
    await authenticate(mockRequest as Request, mockResponse as Response, nextFunction)
    expect(mockResponse.status).toBeCalledWith(401)
    expect(mockResponse.json).toBeCalledWith({ message: 'user or password is wrong' })
  })
})