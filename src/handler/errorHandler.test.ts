import { NextFunction, Request, Response } from 'express'
import { errorHandler } from './errorHandler'

describe('errorHandler', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let nextFunction: NextFunction = jest.fn()
  let error: Error

  beforeEach(() => {
    mockRequest = { headers: {} }
    mockResponse = {
      status: jest.fn(() => mockResponse as Response),
      json: jest.fn(),
    }
    error = Error('error')
  })

  it('expect response error message', async () => {
    const expectedResponse = { message: 'error' }
    errorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction)
    expect(mockResponse.json).toBeCalledWith(expectedResponse)
  })
})